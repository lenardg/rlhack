
export class BackendClient {
    constructor() {
        this.gameid = undefined;

    }

    start() {
        fetch("http://rlbackend.azurewebsites.net/games", {method: "POST"})
        .then(res => res.json())
        .then(resp => {
            this.gameid = resp._id;
        });
    }

    end(name, xp, gold, killer) {
        fetch(`http://rlbackend.azurewebsites.net/endGame/${this.gameid}`, { method: "POST", body: JSON.stringify({
            character: name,
            client: "DungeonfOfDevisioona",
            xp: xp,
            gold: gold,
            killer: killer
        }), headers: new Headers({
            "Content-Type": "application/json"
        })});
    }

}