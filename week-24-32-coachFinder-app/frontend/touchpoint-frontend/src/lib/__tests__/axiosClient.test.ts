// src/lib/__tests__/axiosClient.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import MockAdapter from "axios-mock-adapter";
import { axiosClient } from "../axiosClient";
import axios from "axios";

// Mock localStorage for Node
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

describe("axiosClient interceptor", () => {
  let mock: MockAdapter;
  let refreshMock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axiosClient);
    refreshMock = new MockAdapter(axios);
    localStorage.clear();
  });

  it("✅ passes through normal requests", async () => {
    mock.onGet("/api/users/me").reply(200, { name: "Hamza" });
    const res = await axiosClient.get("/api/users/me");
    expect(res.data.name).toBe("Hamza");
  });

  it("🔁 refreshes token once and retries", async () => {
    mock.onGet("/api/users/me").replyOnce(401);
    refreshMock.onPost("http://localhost:3000/api/auth/refresh").reply(200, {
      accessToken: "NEW_TOKEN",
    });
    mock.onGet("/api/users/me").reply(200, { name: "Hamza" });

    const res = await axiosClient.get("/api/users/me");
    expect(res.data.name).toBe("Hamza");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "accessToken",
      "NEW_TOKEN"
    );
  });

  it("❌ logs out if refresh fails", async () => {
    mock.onGet("/api/users/me").replyOnce(401);
    refreshMock
      .onPost("http://localhost:3000/api/auth/refresh")
      .reply(401, { message: "invalid" });

    const hrefSpy = vi.spyOn(window.location, "href", "set");

    await expect(axiosClient.get("/api/users/me")).rejects.toThrow();
    expect(hrefSpy).toHaveBeenCalledWith("/login");
  });
});
