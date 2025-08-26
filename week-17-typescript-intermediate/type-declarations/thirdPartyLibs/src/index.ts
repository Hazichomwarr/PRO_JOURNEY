import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/users/1";

axios
  .get(url)
  .then((res) => {
    console.log("it worked!");
    console.log(res.data);
  })
  .catch((e) => {
    console.log("Error!!!", e);
  });
