const config = {
    "orgName": `${process.env.OPENCHS_USER_NAME !== undefined ? process.env.OPENCHS_USER_NAME : 'admin'}`,
    "orgClassName": (orgId) => orgId === 1 ? "black" : "text-primary"
}

export default config;