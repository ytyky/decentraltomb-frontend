import Mcp from "./mcp";

const abi = require("./abi.json");

const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://13.212.177.203:8765");


// Tomb address
const tokenAddress = "0x8211a9645750B8322728c9e67e7872042d9f36ba";
const coreAddress = "0x8211a9645750B8322728c9e67e7872042d9f36ba";

const Instance = new McpFunc.Contract(
    abi,
    tokenAddress
);

const Contract = {
    tokenAddress,
    Instance,
    coreAddress
};

export default Contract;
