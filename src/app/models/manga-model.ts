export class Manga {
    private static lastId: number;
    public id: number;
    public title: string;
    public lastIssue: number;
    public status: string;
    public thumb: string;

    static mangas: Manga[] = [];

    constructor(titleParam: string, lastIssueParam: number, statusParam: string, thumbParam: string) {
        this.id = Manga.lastId;
        this.title = titleParam;
        this.lastIssue = lastIssueParam;
        this.status = statusParam;
        this.thumb = thumbParam;

        Manga.lastId++;
    }

    static setLastId(lastIdParam: number) {
        Manga.lastId = lastIdParam;
        console.log("LastId do setLastId = " + Manga.lastId);
    }

    static populaManga():Manga[] {
        if (Manga.mangas.length != 0) {
            return Manga.mangas;
        }
        
        var naruto = new Manga("Naruto",72,"finalizado","https://images-na.ssl-images-amazon.com/images/I/91xUwI2UEVL.jpg");
        var onePiece = new Manga("One Piece",92,"andamento","https://images-na.ssl-images-amazon.com/images/I/51s1IMOV9JL._SX346_BO1,204,203,200_.jpg");
        var dargonBall = new Manga("DragonBall",42,"finalizado","https://i.pinimg.com/564x/04/1e/39/041e39121d129beb6a3423688e8eb03e.jpg");
        var magi = new Manga("Magi",37,"finalizado","https://images-na.ssl-images-amazon.com/images/I/51mZfnyjRvL._SX343_BO1,204,203,200_.jpg");
        var hunter = new Manga("HunterxHunter",36,"andamento","https://lojasaraiva.vteximg.com.br/arquivos/ids/2611292/1008020098.jpg?");
        var fullMetal = new Manga("FullMetal Alchemist",27,"finalizado","https://lojasaraiva.vteximg.com.br/arquivos/ids/12107793/1008169727.jpg?");
        var onePunch = new Manga("One Punch Man",19,"andamento","https://images-na.ssl-images-amazon.com/images/I/81AVPbPbdtL.jpg");
        var bokuNoHero = new Manga("Boku no Hero Academia",24,"andamento","https://lojasaraiva.vteximg.com.br/arquivos/ids/8240649/1008168784.jpg");
        
        Manga.mangas.push(naruto);
        Manga.mangas.push(onePiece);
        Manga.mangas.push(dargonBall);
        Manga.mangas.push(magi);
        Manga.mangas.push(hunter);
        Manga.mangas.push(fullMetal);
        Manga.mangas.push(onePunch);
        Manga.mangas.push(bokuNoHero);
        
        return Manga.mangas;
    }
}