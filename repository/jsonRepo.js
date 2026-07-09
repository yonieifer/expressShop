import fs from "fs/promises";
import "dotenv/config";

const dbPath = process.env.DB_PATH;

export const loadJson = async (pathFromDB) => {
    try {
        const data = await fs
            .readFile(dbPath + pathFromDB, "utf8")
            .then((data) => JSON.parse(data));
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const writeJson = async (pathFromDB, data) => {
    try {
        await fs.writeFile(dbPath + pathFromDB, JSON.stringify(data), "utf8");
    } catch (error) {
        console.log("unable to write:", error);
    }
};
