const default_names = {
    "bc1": "Башня",
    "bn1": "Коник",
    "bb1": "Слон",
    "bq1": "Королева",
    "bk1": "Король",
    "bb2": "Слон",
    "bn2": "Коник", 
    "bc2": "Башня",
    "bp1": "Пешка", 
    "bp2": "Пешка", 
    "bp3": "Пешка", 
    "bp4": "Пешка", 
    "bp5": "Пешка", 
    "bp6": "Пешка", 
    "bp7": "Пешка", 
    "bp8": "Пешка",
    "wp1": "Пешка", 
    "wp2": "Пешка", 
    "wp3": "Пешка", 
    "wp4": "Пешка", 
    "wp5": "Пешка", 
    "wp6": "Пешка", 
    "wp7": "Пешка", 
    "wp8": "Пешка", 
    "wc1": "Башня", 
    "wn1": "Коник", 
    "wb1": "Слон", 
    "wq1": "Королева", 
    "wk1": "Король", 
    "wb2": "Слон", 
    "wn2": "Коник", 
    "wc2": "Башня",
}

class customNamesPieces {
    constructor() {
        this.pieces = default_names;
        // field.forEach((row, y) => {
        //     row.forEach((piece, x) => {
        //         if (piece !== 0) {
        //             this.pieces[String(y)+String(x)] = default_names[String(y)+String(x)];
        //         }
        //     })
        // });
    }

    change_name(piece_id, new_name) {
        if (this.pieces[piece_id] !== undefined) {
            this.pieces[piece_id] = new_name;
            return true;
        } else {
            return false;
        }
    }

    getPiecesNames() {
        return this.pieces;
    }
}

module.exports = customNamesPieces