export const getInitials = (firstname, surname) => {
    const initials = `${firstname.charAt(0)}${surname.charAt(0)}`;
    return initials;
};