$(document).ready(function () {



    var grid = '#js-grid-selection',
        numberOfShips = 1,
        sizeOfGrid = 3,
        state,
        sizeOfGridXY = 9;


    var points;

    var numberOfShipsStart;

    var oppshipsLocation = [];
    var oppshipsLocationRight = [];
    var playershipsLocation = [];
    var playershipsLocationRight = [];

    var x = [];
    var y = [];
    var xFirst = [];
    var yFirst = [];


    var xOpp = [];
    var yOpp = [];
    var xFirstOpp = [];
    var yFirstOpp = [];

    var countBoat = 0;
    var countBoatOpp = 0;

    var count_opps_score = 0;
    var count_players_score = 0;

    var opponents_chosen_steps;

    var count_opps_moves = 0;
    var count_opps_points = 0;
    var count_players_moves = 0;
    var opponents_random_moves;

    var opps_moves_storage = [];
    var players_moves_storage = [];

    var grid_size_stats = [];
    var ships_size_stats = [];

    var game_time = [];

    var minutes = 0;
    var seconds = 0;

    var player_name;


    $("#save-name").click(function () {
        player_name = document.getElementsByName("name")[0].value;
        $('.player-name').addClass('pull-up');
        alert(player_name)
    });


    function init() {
        initial_setup();
        gameplay();
    }

    init();

    $("#js-stats-btn").click(function () {
        $('.game-stats').toggleClass('pull-stats');
    });
    $("#js-expand-menu").click(function () {
        $('#js-grid-selection').toggleClass('lift-up');
    });


    var startTime;
    var tik_tak = 0;

    function time_tick() {
        // later record end time
        var endTime = new Date();

        // time difference in ms
        var timeDiff = endTime - startTime;

        // strip the miliseconds
        timeDiff /= 1000;

        // get seconds
        seconds = Math.round(timeDiff % 60);

        // remove seconds from the date
        timeDiff = Math.floor(timeDiff / 60);

        // get minutes
        minutes = Math.round(timeDiff % 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        $(".timer").text(minutes + ":" + seconds);
        tik_tak = setTimeout(time_tick, 1000);
    }

    function initial_setup() {


        $("#js-grid-btn").change(function () {

          //  $('#js-start-game').addClass('disabled');
            //   $("#js-ships-count").html('');

            var matrixSize = $(this).val(),

                gridX = parseInt(matrixSize),
                MaxOfShips = gridX;

            console.log(matrixSize);

            //     $("#js-box-size").html(MaxOfShips + "x" + MaxOfShips); //display grid size

            sizeOfGrid = MaxOfShips;
            sizeOfGridXY = gridX * gridX;

            $('#js-ships-list').find("option").remove();

            for (var i = 1; i < MaxOfShips; i++) {
                var option = '<option value"' + i + '">' + i + '</option>';
                $(option).appendTo('#js-ships-list');
            }

        });

        $("#js-ships-list").change(function () {

            var shipsInt = $(this).val();
                console.log(shipsInt)

            numberOfShips = shipsInt;

            console.log('numberOfShips' + numberOfShips)
            $('#js-start-game').removeClass('disabled');
        });
//restart game

        //create grid
        $("#js-start-game").click(function () {


            $('.board-wrap').removeClass('disabled');
            startTime = new Date();
            setTimeout(time_tick, 1000);

            countBoat = 0;
            x = [];
            y = [];
            xFirst = [];
            yFirst = [];

            countBoatOpp = 0;
            xOpp = [];
            yOpp = [];
            xFirstOpp = [];
            yFirstOpp = [];

            oppshipsLocation = [];
            oppshipsLocationRight = [];
            playershipsLocation = [];
            playershipsLocationRight = [];

            count_opps_moves = 0;
            count_players_moves = 0;

            numberOfShipsStart = numberOfShips;

            $('#board-left').empty();
            $('#board-right').empty();


            grid_size_stats.push(sizeOfGrid + ' x ' + sizeOfGrid);
            ships_size_stats.push(numberOfShipsStart);




         //   $('.lift-up').css('transform','translate3d(0, -'+ menu_height +', 0)');

            $("h1 span").html(numberOfShipsStart);


            for (var a = [], i = 1; i < sizeOfGridXY; ++i) a[i] = i;

            function shuffle(array) {
                var tmp, current, top = array.length;
                if (top) while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp;
                }
                return array;
            }

            a = shuffle(a);

            opponents_random_moves = a;
            console.log('opponents_random_moves :' + opponents_random_moves);

            $('#js-grid-selection').addClass('lift-up');


            $('h1').removeClass('transparent');
            $("#js-expand-menu").css("opacity", "1");

            var Rows = sizeOfGrid;
            var Cols = sizeOfGrid;
            var CellNum = -1;
            var RowNum = -1;
            var cellnumber = 0;

            for (var i = 0; i < Rows; ++i) {

                var string_tr = '<tr>';

                $(string_tr).appendTo('#board-left');
                $(string_tr).appendTo('#board-right');
                RowNum += 1;

                for (var j = 0; j < Cols; ++j) {

                    cellnumber += 1;
                    CellNum += 1;
                    if (CellNum === sizeOfGrid) {
                        CellNum = 0;
                    }
                    var string_td = '<td class="square ' + cellnumber + '" id="Lcell-' + RowNum + CellNum + '">';
                    $(string_td).appendTo('#board-left');

                    var string_tdR = '<td class="square " id="Rcell-' + RowNum + CellNum + '">';
                    $(string_tdR).appendTo('#board-right');

                    var string_span = '<span></span>';
                    $(string_span).appendTo('#board-left');
                    $(string_span).appendTo('#board-right');

                    var string_td_end = '</td>';
                    $(string_td_end).appendTo('#board-left');
                    $(string_td_end).appendTo('#board-right');


                }

                //    document.getElementById("board").writeln("</tr>") ;
                var string_tr_end = '</tr>';
                $(string_tr_end).appendTo('#board-left');
                $(string_tr_end).appendTo('#board-right');
            }

            paiguta_uus_laev = function (sisend) {


                for (var row = 0; row < GRID_x + 1; row++) {

                    for (var col = 0; col < GRID_x + 1; col++) {


                        var curr = sisend[row][col];

                        var top1 = (row === 0) ? 0 : sisend[row - 1][col];
                        var top2 = (row === 0) ? 0 : sisend[row - 1][col + 1];

                        var bot1 = (row === GRID_x) ? 0 : sisend[row + 1][col];
                        var bot2 = (row === GRID_x) ? 0 : sisend[row + 1][col + 1];

                        var lef = (col === 0) ? 0 : sisend[row][col - 1];

                        var rig1 = (col === GRID_x) ? undefined : sisend[row][col + 1];
                        var rig2 = (col === GRID_x - 1) ? 0 : sisend[row][col + 2];


                        if (curr === 0 && top1 === 0 && top2 === 0 && bot1 === 0 && bot2 === 0 && lef === 0 && rig2 === 0 && rig1 === 0) {

                            countBoat += 1;

                            sisend[row][col] = 1;
                            sisend[row][col + 1] = 1;

                            y.push([row]);
                            x.push([col]);

                            console.log('---');
                            console.log(countBoat + ' YX: ' + row + col);


                        }

                        else if (curr === 1 && rig1 === 1) {

                            countBoat += 1;

                            sisend[row][col] = 1;
                            sisend[row][col + 1] = 1;

                            y.push([row]);
                            x.push([col]);


                            console.log(countBoat + ' YXesimene: ' + row + col);


                        }

                    }
                }

                sisend.forEach(function (rows) {
                    console.log(rows);
                });


            };

            paiguta_uus_laev_opp = function (sisend) {


                for (var row = 0; row < GRID_x + 1; row++) {

                    for (var col = 0; col < GRID_x + 1; col++) {


                        var curr = sisend[row][col];

                        var top1 = (row === 0) ? 0 : sisend[row - 1][col];
                        var top2 = (row === 0) ? 0 : sisend[row - 1][col + 1];

                        var bot1 = (row === GRID_x) ? 0 : sisend[row + 1][col];
                        var bot2 = (row === GRID_x) ? 0 : sisend[row + 1][col + 1];

                        var lef = (col === 0) ? 0 : sisend[row][col - 1];

                        var rig1 = (col === GRID_x) ? undefined : sisend[row][col + 1];
                        var rig2 = (col === GRID_x - 1) ? 0 : sisend[row][col + 2];


                        if (curr === 0 && top1 === 0 && top2 === 0 && bot1 === 0 && bot2 === 0 && lef === 0 && rig2 === 0 && rig1 === 0) {

                            countBoatOpp += 1;

                            sisend[row][col] = 1;
                            sisend[row][col + 1] = 1;

                            yOpp.push([row]);
                            xOpp.push([col]);

                            console.log('---');
                            console.log(countBoatOpp + ' YX: ' + row + col);


                        }

                        else if (curr === 1 && rig1 === 1) {

                            countBoatOpp += 1;

                            sisend[row][col] = 1;
                            sisend[row][col + 1] = 1;

                            yOpp.push([row]);
                            xOpp.push([col]);


                            console.log(countBoatOpp + ' YXesimene: ' + row + col);


                        }

                    }
                }

                sisend.forEach(function (rows) {
                    console.log(rows);
                });


            };


            switch (true) {
                case sizeOfGrid === 3:
                    state = [
                        [
                            [1, 1, 0],
                            [0, 0, 0],
                            [0, 0, 0]
                        ],
                        [
                            [0, 1, 1],
                            [0, 0, 0],
                            [0, 0, 0]
                        ]
                    ];
                    break;
                case sizeOfGrid === 4:
                    state = [
                        [
                            [1, 1, 0, 0],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0]
                        ],
                        [
                            [0, 1, 1, 0],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 1, 1],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0]
                        ]
                    ];
                    break;
                case sizeOfGrid === 5:
                    state = [

                        [
                            [1, 1, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 1, 1, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 1, 1, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 1, 1],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0]
                        ]
                    ];
                    break;
                case sizeOfGrid === 6:
                    state = [

                        [
                            [1, 1, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 1, 1, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 1, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 1, 1, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 1, 1],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0]
                        ]
                    ];
                    break;
                case sizeOfGrid === 7:
                    state = [

                        [
                            [1, 1, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 1, 1, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 1, 1, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 1, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 1, 1, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 1, 1],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0]
                        ]
                    ];
                    break;
                case sizeOfGrid === 8:
                    state = [

                        [
                            [1, 1, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 1, 1, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 1, 1, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 1, 1, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 1, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 1, 1, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 0, 1, 1],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ]
                    ];
                    break;
                case sizeOfGrid === 9:
                    state = [

                        [
                            [1, 1, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 1, 1, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 1, 1, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 1, 1, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 1, 1, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 1, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 0, 1, 1, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 0, 0, 1, 1],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ]
                    ];
                    break;
                case sizeOfGrid === 10:
                    state = [

                        [
                            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ]
                    ];
                    break;
            }


            var current_state = state;

            var randomInput = current_state[Math.floor(Math.random() * current_state.length)];

            var randomInput_opp = current_state[Math.floor(Math.random() * current_state.length)];

            var ships = current_state.length;

            console.log('max ships ' + ships);

            var GRID_x = current_state.length;

            paiguta_uus_laev(randomInput);

            paiguta_uus_laev_opp(randomInput_opp);


            function setup_player() {

                //randomize the order of all ships
                var is_ship = [0];
                while (is_ship.length < countBoat) {
                    var randomnumber = Math.ceil(Math.random() * countBoat - 1)
                    var found = false;
                    for (var i = 0; i < is_ship.length; i++) {
                        if (is_ship[i] == randomnumber) {
                            found = true;
                            break
                        }
                    }
                    if (!found)is_ship[is_ship.length] = randomnumber;
                }


                console.log('-----------');
                console.log(is_ship);
                console.log('y: ' + y);
                console.log('x: ' + x);
                console.log('-----------');

                //amount of ships chosen from ui will be taken from the randomized array of ships (var is_ship)
                for (var z = 0; z < numberOfShipsStart; ++z) {


                    var xLast = x[is_ship[z]];
                    var yLast = y[is_ship[z]];


                    console.log('yx value at index [' + z + '] is: ' + yLast + xLast);
                    console.log('-----------');

                    var yx_sum = yLast + xLast;
                    playershipsLocation.push(yx_sum);


                    $("#Lcell-" + yLast + xLast).addClass("ship");
                    var nextCell = ++xLast;
                    $("#Lcell-" + yLast + nextCell).addClass("ship");

                    yx_sum = yLast + xLast;
                    playershipsLocationRight.push(yx_sum);
                    //     console.log('playershipsLocationRight'+playershipsLocationRight)

                }


            }

            setup_player();

            //    console.log('player ships location :' +  playershipsLocation);

            function setup_opp() {

                //randomize the order of all ships
                var is_ship = [0];
                while (is_ship.length < countBoatOpp) {
                    var randomnumber = Math.ceil(Math.random() * countBoatOpp - 1)
                    var found = false;
                    for (var i = 0; i < is_ship.length; i++) {
                        if (is_ship[i] == randomnumber) {
                            found = true;
                            break
                        }
                    }
                    if (!found)is_ship[is_ship.length] = randomnumber;
                }

                console.log('-----------');
                console.log(is_ship);
                console.log('y: ' + yOpp);
                console.log('x: ' + xOpp);
                console.log('-----------');

                //amount of ships chosen from ui will be taken from the randomized array of ships (var is_ship)
                for (var z = 0; z < numberOfShipsStart; ++z) {


                    var xLast = xOpp[is_ship[z]];
                    var yLast = yOpp[is_ship[z]];


                    console.log('yx value at index [' + z + '] is: ' + yLast + xLast);
                    console.log('-----------');

                    var yx_sum = yLast + xLast;

                    oppshipsLocation.push(yx_sum);

                    yx_sum = yLast + ++xLast;
                    oppshipsLocationRight.push(yx_sum);


                }


            }

            setup_opp();


            gameplay();

        });


    }

    function gameplay() {


        var cell_id;
        var c_id;
        var player_left;
        var opp_left

        $('#board-left').addClass('disabled')
        $('#board-right').removeClass('disabled')
        $('.card').removeClass('flipped');
        var points = $('.ship-player').length / 2;

        /////////////////////////////////////////////////////////////////////// players turn
        $('.board-right td').on("click", function () {

            cell_id = $(this).attr("id");
            c_id = cell_id.replace('Rcell-', '');


            ++count_players_moves;

            console.log('count_players_move: ' + count_players_moves);
            if (oppshipsLocation.indexOf(c_id) != -1) {   //if ship is hit

                $(this).addClass('ship-opponent');
            }
            else if (oppshipsLocationRight.indexOf(c_id) != -1) {  //if ship is hit
                $(this).addClass('ship-opponent');
            }
            else {                                             //if missed, go to opponents_turn function
                $(this).addClass('player-missed');
                $('#board-right').addClass('disabled')
                $('#board-left').removeClass('disabled')
                $('.card').addClass('flipped');

                setTimeout(opponents_turn, 1000);
            }

            var player_points = $('.ship-opponent').length / 2;
            count_players_score = player_points;
            var player_missed = $('.player-missed').length;
            $('.players-moves').html(player_missed);

            opp_left = numberOfShipsStart - player_points;

            $('#opponents-navy').html(opp_left);

            if (opp_left === 0) {

                players_moves_storage.push(count_players_moves);
                opps_moves_storage.push(count_opps_moves);

                $('.curr-game').html(' you won with ' + count_players_moves + ' moves, opponent made ' + count_opps_moves + ' moves ');
                points = $('.ship-player').length / 2;
                game_ended();
            }


        });

        /////////////////////////////////////////////////////////////////////// players turn end


        function opponents_turn() {

            ++count_opps_moves;


            console.log('count_opps_moves: ' + count_opps_moves);

            opponents_random_calc();
            function opponents_random_calc() {

                opponents_chosen_steps = opponents_random_moves.pop();

                if (opponents_chosen_steps === undefined) {
                    opponents_random_calc();
                }
            }



            console.log('opponents_chosen_steps' + opponents_chosen_steps);

            var move_match_id = $('.' + opponents_chosen_steps).attr('id');
            console.log(move_match_id);
            var move_match = move_match_id.replace("Lcell-", "");


            console.log('cell id where opponent clicks: ' + move_match_id);


            if (playershipsLocation.indexOf(move_match) != -1) {   // if ship is hit

                $('#' + move_match_id).addClass('ship-player');
                points = $('.ship-player').length / 2;
                count_opps_score = points;
                player_left = numberOfShipsStart - points;
                $('#players-navy').html(player_left);

                ++count_opps_points;
                setTimeout(opponents_turn, 1000);

            }

            else if (playershipsLocationRight.indexOf(move_match) != -1) {  // if ship is hit

                $('#' + move_match_id).addClass('ship-player');
                points = $('.ship-player').length / 2;
                count_opps_score = points;
                player_left = numberOfShipsStart - points;
                $('#players-navy').html(player_left);
                ++count_opps_points;
                setTimeout(opponents_turn, 1000);

            }

            else {
                $('#' + move_match_id).addClass('opp-missed');  // if missed, go to players_turn function
                //        playersTurn = true;
                setTimeout(delay_missed, 1000);
                function delay_missed() {
                    $('#board-left').addClass('disabled')
                    $('#board-right').removeClass('disabled')
                    $('.card').removeClass('flipped');
                }

                return;
            }
            if (player_left === 0) {

                players_moves_storage.push(count_players_moves);
                opps_moves_storage.push(count_opps_moves);

                $('.curr-game').html('you lost with ' + count_players_moves + ' moves, opponent made ' + count_opps_moves + ' moves ');
                game_ended();
            }
        }


    }

    function game_ended() {


        $('.stats-table').removeClass('hidden');
        $('#player-stats').empty();
        $('#opponent-stats').empty();
        $('.choose-grid').removeClass('lift-up');
        $('.board-wrap').addClass('disabled');

        console.log('stats');
        //   console.log('players_moves_storage' + players_moves_storage)


        game_time.push(minutes + ":" + seconds);

        for (var loop = 0; loop < players_moves_storage.length; ++loop) {


            var table_row_player = '<tr><td>' + grid_size_stats[loop] + '</td><td>' + ships_size_stats[loop] + '</td><td>' + players_moves_storage[loop] + '</td><td>' + opps_moves_storage[loop] + '</td><td>' + game_time[loop] + '</td></tr>';

            $(table_row_player).prependTo('#player-stats');
            console.log('stats ' + players_moves_storage[loop])

            if (players_moves_storage.length === 11) {

                grid_size_stats.shift();
                ships_size_stats.shift();
                players_moves_storage.shift();
                opps_moves_storage.shift();
                game_time.shift();

            }
        }

        clearTimeout(tik_tak);

        getGamePlayData();

        function getGamePlayData() {

            document.getElementById('player1_name').value = "player1_name";
            document.getElementById('player1_score').value = "player1_score";
            document.getElementById('player2_score').value = "player2_score";
            document.getElementById('start_time').value = "start_time";
            document.getElementById('game_time').value = "game_time";
            document.getElementById("submitForm").submit();


            
        }


        var form = $('#form'); // contact form
        var submit = $('#submit-data');  // submit button


        // form submit event
        form.on('submit', function(e) {
            e.preventDefault(); // prevent default form submit

            $.ajax({
                url: '/~Mehis.Kont/cgi-bin/prax3/results.py', // form action url
                type: 'POST', // form submit method get/post
                dataType: 'html', // request type html/json/xml
                data: form.serialize(), // serialize form data
                beforeSend: function() {
                    submit.html('Sending....'); // change submit button text
                },
                success: function(data) {
                    form.trigger('reset'); // reset form
                    submit.html('Send Email'); // reset submit button text
                },
                error: function(e) {
                    console.log(e)
                }
            });
        });


    }

});
