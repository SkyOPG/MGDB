const page = 2;
let a;
let limit;
let at;

if(page === 1) {
    a = page * 15 + 2;
    limit = 1 + 2;
} else { 
    a = page * 15 + 2
    limit = a - 15;
}
at = limit;

while(at <= a){
    const db = dl[at]
            console.log(`${db}`)
            const top = db["#"]
            const name = db["Level Name"];
            const ID = db["ID"];
            const victor = db["First Victor"];
            const points = Math.floor(db["Points"]);
            arr.push({ name: `**#${top}: ${name}**`, value:`> Points: \`${points}\`\n> ID: \`${ID}\`\n> First Victor: \`${victor}\`` });
    at++;
}