// Executes this arrow function after everything loaded up
window.onload = () => {
    import("./presentation/minesweeper-gui.js")
        .then((module) => {
            const MinesweeperGUI = module.MinesweeperGUI;
            const component = document.getElementById("game");

            const game = new MinesweeperGUI(component, 10, 10, 5);
            game.draw();
        });
};
