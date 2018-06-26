export class Team {
    id?: string = "2";
    name: string = "";
    emoji: string = "";
    emojiString: string = "";
    fifaCode: string = "";
    flag: string = "";
    iso2: string = "";

    constructor(content?: {}) {
        if (content) {
            for (var k in content) {
                this[k] = content[k] || "";
            }
        }
    }
}
