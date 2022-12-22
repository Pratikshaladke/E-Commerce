export const getAdminInfo = () => {
    let admin = localStorage.getItem("users");
    admin = (JSON.parse(admin));
   return admin;
}