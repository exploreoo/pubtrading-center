// 模块请求封装示例
import axios from "../axios/index";

const test = async (data?: any) => axios.get("/top/artists", data);

export { test };
