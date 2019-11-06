import {field} from "./models/field.js";

class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Minesweeper {

    /**
     * @param {number} rows
     * @param {number} columns
     * @param {number | null} bombs
     */
    constructor(rows, columns, bombs = null) {
        this.rows = rows;
        this.columns = columns;



        this.isGameOver = false;

        if (bombs == null)
            this.bombs = this._calculateDefaultBombs();
        else
            this.bombs = bombs;

        this.array = [];
        for(let i = 0; i < rows; i++) {
            let array2 = [];
            for (let j = 0; j < columns; j++) {
                array2.push(field.hidden);
            }
            this.array.push(array2);
        }
        this.bombLocation = [];

        for(let g = 0; g < this.bombs; g++) {

            let x = Math.floor(Math.random() * rows);
            let y = Math.floor(Math.random() * columns);

            let coord = new Coordinate(x, y);

            this.bombLocation.push(coord);
        }

        console.log(this.bombLocation);

    }


    /**
     * TODO: IMPLEMENT THIS
     * Calculate how many bombs should be on the field and return it.
     * The calculation should Depend on the size of the field.
     * @private
     * @return {number} amount of bombs
     */
    _calculateDefaultBombs() {

        return 10;
    }

    /**
     * TODO: IMPLEMENT THIS
     * Returns the current state of the field.
     * Fields can be: hidden, visible, flagged or question marked.
     * @param {number} x
     * @param {number} y
     * @return {field}
     */
    getField(x, y) {
        return this.array[x][y];
    }

    /**
     * TODO: IMPLEMENT THIS
     * Returns how many bombs are around the field
     * @param {number} x
     * @param {number} y
     * @return {number}
     */
    getAmountOfSurroundingBombs(y, x) {
        let nearBombs = 0;

        if(this.isBombOnPosition(x+1, y) === true)
            nearBombs++;

        if (this.isBombOnPosition(x, y+1)  === true)
            nearBombs++;

        if (this.isBombOnPosition(x+1, y+1)  === true)
            nearBombs++;

        if (this.isBombOnPosition(x-1, y)  === true)
            nearBombs++;

        if (this.isBombOnPosition(x, y-1)  === true)
            nearBombs++;

        if (this.isBombOnPosition(x-1, y-1)  === true)
            nearBombs++;

        if (this.isBombOnPosition(x+1, y-1)  === true)
            nearBombs++;

        if (this.isBombOnPosition(x-1, y+1)  === true)
            nearBombs++;

        return nearBombs;
    }


    /**
     * TODO: IMPLEMENT THIS
     * Returns true there is a bomb on the position
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */
    isBombOnPosition(x, y) {
        for (let i = 0; i < this.bombLocation.length; i++) {
            if (this.bombLocation[i].x === x && this.bombLocation[i].y === y)
                return true;
        }
        return false;
    }

     /**
      * TODO: IMPLEMENT THIS
      * Reveals the field and all empty connected fields around it.
      * Or stops the game if clicked on a position, where a bomb is located.
      * @param {number} x
      * @param {number} y
      */

    reveal(x, y) {
        if(!this.array[y][x] === field.flag || this.array[y][x] === field.question_mark) {
            this.array[y][x] = field.visible;
        }
        if(this.array[y][x] === field.hidden) {
            this.array[y][x] = field.visible;
        }

         if (this.isBombOnPosition(x,y) === true) {
             this.isGameOver = true;
             this.array[y][x] = field.hidden;
         }
         this.spare(x,y);
         }

    spare(x,y) {

        if (this.array[x][y] === field.hidden) {

            this.array[x][y] = field.visible;

            if (this.getAmountOfSurroundingBombs(x, y) === 0) {
                 if(x >= 0 && x < this.rows && y + 1 >= 0 && y + 1 < this.columns) {
                     this.spare(x, y + 1);
                }
                if (x - 1 >= 0 && x - 1 < this.rows && y >= 0 && y < this.columns) {
                    this.spare(x - 1, y);
                }
                if (x + 1 >= 0 && x + 1 < this.rows && y >= 0 && y < this.columns) {
                    this.spare(x + 1, y);
                }
                if (x >= 0 && x < this.rows && y - 1 >= 0 && y - 1 < this.columns) {
                    this.spare(x, y - 1);
                }
            }
        }
    }


    /**
     * TODO: IMPLEMENT THIS
     * Toggles the field state, if it has not been revealed yet.
     * @param {number} x
     * @param {number} y
     */
    toggleFieldState(x, y) {
            if(this.array[y][x] === field.hidden) {
                this.array[y][x] = field.flag;
            }else if(this.array[y][x] === field.flag) {
                this.array[y][x] = field.question_mark;
            }else if(this.array[y][x] === field.question_mark) {
                this.array[y][x] = field.hidden;
            }

    }


    /**
     * TODO: IMPLEMENT THIS
     * Returns if the user already won
     * @returns {boolean}
     */
    didWin(){
        if(this.bombLocation === field.flag)
            return true;
    }

    /**
     * TODO: IMPLEMENT THIS
     * Returns if the user clicked a bomb and therefore lost.
     * @returns {boolean}
     */
    didLoose() {
        if (this.isGameOver === true)
            return true;
    }

    /**
     * Returns the remaining amount bombs, user has to select
     * @return {number}
     */
    getRemainingBombCount() {

        return this.bombs;
    }

}