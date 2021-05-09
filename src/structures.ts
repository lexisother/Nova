import {GenericJSON, GenericStructure, select} from "./lib";
import FileManager from "./modules/storage";

class ConfigStructure extends GenericStructure {
    public token: string;
    public prefix: string;
    public owner: string;
    public admins: string[];
    public systemLogsChannel: string | null;

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(data: GenericJSON) {
        super("config");
        this.token = select(data.token, "<ENTER YOUR TOKEN HERE>", String);
        this.prefix = select(data.prefix, "n!", String);
        this.owner = select(data.owner, "", String);
        this.admins = select(data.admins, [], String, true);
        this.systemLogsChannel = select(data.systemLogsChannel, null, String);
    }
}

export let Config = new ConfigStructure(FileManager.read("config"));
