function maskEmail (email) {
    if (email.includes('@') && email.includes(".") && email.length > 10) {
        const atIndex = email.indexOf('@');
        const partToMask = email.slice(1, (atIndex-1));
        let maskedPart = "*".repeat(partToMask.length);
        let maskedEmail = email.replace(partToMask, maskedPart)
        return maskedEmail;
    } else {
        return "invalid email"
    }
}