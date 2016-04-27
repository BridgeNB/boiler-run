$(document).ready(function(){
  //Canvas stuff
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");
  var w = $("#canvas").width();
  var h = $("#canvas").height();

  var cw = 10;
  var coin_array = [];
  var coin_num = 40;
  var player;
  var step;
  var coinleft;
  var blink;
  //Map
  var map =
      [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0],
        [1,1,0,0,0,1,1,1,1,2,2,2,2,2,2,2,1,1,1,0,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0],
        [1,1,0,1,0,0,1,1,2,2,2,2,2,2,2,2,2,1,1,1,0,0,1,1,1,0,2,0,1,1,1,1,1,0,1,1,1,1,1,1,0],
        [1,1,0,1,1,0,0,1,1,2,2,1,1,1,2,2,1,1,1,0,1,0,0,1,0,2,2,2,0,1,1,1,1,0,1,1,1,1,1,1,0],
        [1,1,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,0,2,1,1,0,0,2,2,2,2,2,0,1,1,1,0,1,1,1,1,1,1,0],
        [1,1,0,2,2,1,1,0,0,1,1,1,2,1,1,0,1,0,2,2,2,1,1,0,0,2,2,2,2,2,0,1,1,0,1,1,1,1,1,1,0],
        [1,1,0,2,2,2,1,1,0,0,1,2,2,2,2,1,0,2,2,2,2,2,1,1,0,0,2,2,2,2,2,0,1,0,1,1,1,1,1,1,0],
        [1,1,0,1,2,2,2,1,1,0,0,1,2,2,2,0,1,0,2,2,2,2,2,1,1,0,0,2,2,2,2,2,0,0,1,1,1,1,1,1,0],
        [1,1,0,1,1,2,2,2,1,1,0,0,1,2,2,2,2,1,0,2,2,2,2,2,1,1,0,0,2,2,2,1,1,0,1,1,1,1,1,1,0],
        [1,1,0,1,2,2,2,1,1,1,1,0,0,1,2,2,2,0,1,0,2,2,2,2,2,1,1,0,0,2,1,1,1,1,0,1,1,1,1,1,0],
        [1,1,0,1,2,2,1,1,1,1,1,1,0,0,1,2,0,1,2,1,0,2,2,2,1,1,1,1,0,0,1,1,2,2,1,0,0,0,0,0,0],
        [1,1,0,1,1,1,1,2,1,1,1,1,1,0,0,0,1,2,2,2,1,0,2,1,1,1,1,1,1,0,0,2,2,2,2,1,1,1,1,1,0],
        [1,1,0,1,1,1,2,2,2,1,1,1,1,1,0,0,2,2,2,2,2,1,0,1,1,2,2,1,1,1,0,0,2,2,2,2,2,2,2,1,0],
        [1,1,0,2,2,2,2,2,1,1,1,1,1,1,0,0,0,1,2,2,2,1,1,0,1,2,2,2,1,1,1,0,0,1,2,2,2,2,2,1,0],
        [1,1,0,2,2,2,2,1,1,2,1,1,1,0,1,1,0,0,1,2,1,1,0,1,0,1,2,2,2,1,1,1,0,0,2,2,2,2,2,1,0],
        [1,1,0,2,2,2,1,1,2,2,2,2,0,1,1,1,1,0,0,1,1,0,1,1,1,0,1,2,2,2,1,1,1,0,2,2,2,2,2,1,0],
        [1,1,0,2,2,1,1,2,2,2,2,0,1,2,1,1,1,1,0,0,0,1,1,1,0,1,0,1,2,2,1,1,1,0,0,1,1,1,1,1,0],
        [1,1,0,1,1,1,1,1,2,2,0,1,2,2,2,1,1,1,1,0,0,1,1,0,1,1,1,0,1,1,1,2,1,1,0,0,1,1,1,1,0],
        [1,1,0,1,1,1,1,1,1,0,1,1,2,2,2,1,1,1,0,1,1,0,0,1,1,1,0,1,0,2,2,2,1,1,1,0,0,1,1,1,0],
        [1,1,0,1,1,1,1,1,1,0,1,2,2,2,1,1,1,0,1,1,1,0,0,1,1,0,1,1,0,2,2,2,2,1,1,1,0,0,1,1,0],
        [1,1,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,0,1,1,0,1,1,0,0,1,1,2,1,0,2,2,2,2,1,1,1,0,0,1,0],
        [1,1,0,1,1,1,1,1,1,1,0,1,1,1,2,1,1,0,1,0,1,1,1,0,1,1,2,2,2,1,0,2,2,2,2,1,1,1,0,0,0],
        [1,1,0,2,2,2,2,1,1,1,1,0,1,2,2,2,1,1,0,0,1,1,0,1,1,2,2,2,2,2,1,0,2,2,2,2,1,1,1,0,0],
        [2,2,0,2,2,2,1,1,1,1,1,1,0,1,2,2,2,1,1,0,0,0,1,1,2,2,2,2,2,2,2,0,2,2,1,1,1,1,1,1,0],
        [2,2,0,2,2,2,1,1,1,1,1,0,2,1,2,2,2,2,1,1,0,1,1,2,2,2,2,2,2,2,0,0,1,1,1,2,2,1,1,1,0],
        [2,2,0,2,2,2,1,1,1,1,0,2,2,2,1,1,2,1,0,0,0,1,1,2,2,2,2,2,0,0,1,0,1,1,2,2,2,1,1,1,0],
        [2,2,0,2,2,2,1,1,0,0,2,2,2,2,2,0,0,0,1,1,0,1,1,1,1,1,2,0,1,1,1,0,2,2,2,2,2,2,1,1,0],
        [2,2,0,2,2,2,1,1,0,2,2,2,2,2,0,1,1,1,1,1,0,2,2,2,2,1,0,1,2,2,2,0,2,2,2,2,2,1,1,1,0],
        [2,2,0,2,2,2,1,1,0,2,2,2,2,0,1,1,1,1,1,1,0,2,2,2,2,1,0,2,2,2,2,0,2,2,2,2,2,2,1,1,0],
        [2,2,0,1,1,1,1,1,0,2,2,2,0,1,1,1,1,2,2,1,0,2,2,2,2,1,0,2,2,2,2,0,2,2,2,2,2,2,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,1,0,2,2,2,2,1,0,2,2,2,2,0,2,2,2,2,2,2,1,1,0],
        [1,1,0,1,1,1,1,1,1,0,2,2,2,2,2,0,1,1,1,1,0,2,2,2,2,1,0,2,2,2,1,0,2,2,2,2,2,2,1,1,0],
        [1,1,0,2,2,1,1,1,1,0,2,2,2,2,2,0,0,0,0,0,0,2,2,2,2,1,0,1,1,1,1,0,2,2,2,2,2,2,1,1,0],
        [1,1,0,2,2,2,1,1,1,0,1,2,1,1,0,1,1,1,1,1,0,2,2,2,2,1,0,1,1,1,1,0,1,1,1,2,2,2,1,1,0],
        [1,1,0,2,2,2,1,1,1,0,2,2,2,2,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,0,2,2,1,1,1,1,0,2,2,2,2,0,2,2,2,2,1,0,2,2,2,2,2,2,0,2,2,2,2,2,2,2,0,1,2,2,1,0],
        [1,1,0,1,1,1,1,2,1,0,2,2,2,2,0,2,2,2,2,1,0,2,2,2,2,2,2,0,2,2,2,2,2,2,2,0,2,2,2,1,0],
        [1,1,0,1,1,1,2,2,1,0,2,2,2,2,0,2,2,2,2,1,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,2,2,1,0],
        [1,1,0,1,1,1,2,2,1,0,2,2,2,2,0,1,1,1,1,1,0,2,2,2,2,2,2,0,2,2,2,2,2,2,2,1,2,2,2,1,0],
        [1,1,0,1,1,1,2,2,1,0,0,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,1,0,2,2,2,2,2,2,2,1,2,2,2,1,0],
        [1,1,0,0,0,0,2,2,1,0,2,2,1,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,1,1,1,0,0,0,0,0,0],
        [1,1,0,2,2,0,0,0,0,0,2,2,1,0,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,1,1,0,0,0,1,1,1,2,2,0],
        [1,1,0,2,2,2,2,2,1,0,2,2,1,0,0,1,1,1,1,1,0,1,1,1,1,2,2,1,1,0,1,1,0,1,1,0,0,1,2,2,0],
        [1,1,0,2,2,2,2,2,1,0,2,2,1,0,1,1,1,1,1,1,0,1,2,2,2,2,2,1,1,1,0,0,1,1,2,2,2,1,2,1,0],
        [1,1,0,2,2,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,2,2,2,2,2,1,1,2,2,2,0,1,2,2,2,1,2,2,0],
        [1,1,0,2,2,1,1,1,1,0,2,2,1,0,1,1,1,1,1,1,0,1,2,2,2,2,2,2,2,2,2,2,1,0,2,2,2,1,2,2,0],
        [1,1,0,0,0,0,0,1,1,0,2,2,1,0,1,1,1,1,1,1,0,1,2,2,2,2,2,2,2,2,2,2,1,0,2,2,2,1,2,2,0],
        [1,1,0,0,0,0,0,1,1,0,2,2,1,0,1,1,1,1,1,1,0,1,2,2,2,2,2,2,2,2,2,2,1,0,2,2,2,1,2,2,0],
        [1,1,0,2,2,1,0,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,2,2,2,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,0],
        [1,1,0,2,2,1,0,1,1,0,2,2,1,0,1,1,1,1,1,1,0,1,2,2,2,2,2,2,2,2,2,2,2,0,2,2,2,2,2,1,0],
        [1,1,0,2,2,1,0,0,0,0,2,2,1,0,1,1,1,1,1,1,0,1,2,2,2,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,0],
        [1,1,0,2,2,1,1,1,1,1,2,2,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,0],
        [1,1,0,2,2,1,1,1,2,2,2,2,1,0,1,1,1,1,1,1,0,1,1,1,1,1,2,2,1,1,1,1,1,0,1,1,1,1,1,1,0],
        [1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

  function init()
  {
    create_player();
    create_coin();
    step = 0;
    coinleft = 40;
    blink = 0;
    if(typeof game_loop != "undefined") clearInterval(game_loop);
    game_loop = setInterval(paint, 60);
  }
  init();

  function create_player()
  {
    var length = 1;
    player = {x: 0, y: 31};
  }

  function create_coin()
  {
    var i = 0;
    // Put 40 coins in total
    while (true) {
      var xtem = Math.round(Math.random()*(w-cw)/cw);
      var ytem = Math.round(Math.random()*(h-cw)/cw);
      if (map[ytem][xtem] == 0) {
        coin_array[i] = {
          x: xtem,
          y: ytem,
        };
        i++;
      }
      if (i == coin_num) break;
    }
    //This will create a cell with x/y between 0-44
    //Because there are 45(450/10) positions accross the rows and columns
  }

  function paint()
  {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);

    //Create the map
    for (var i = 0; i<map.length; i++) {
      for (var j = 0; j < map[i].length; j++) {
        // Draw map
        if (map[i][j] == 0) {
          ctx.fillStyle = "rgb(220,220,220)";
          ctx.fillRect(j*cw, i*cw, cw, cw);
        } else if (map[i][j] == 1) {
          ctx.fillStyle = "rgb(60,179,113)";
          ctx.fillRect(j*cw, i*cw, cw, cw);
        } else if (map[i][j] == 2) {
          ctx.fillStyle = "rgb(160,82,45)";
          ctx.fillRect(j*cw, i*cw, cw, cw);
        }
      }
    }

    //Paint the eater
    blink++;
    if(blink % 2 == 0){
      paint_cell(player.x, player.y, "black");
    }
    
    //Paint the coin
    for(var x = 0; x < coin_num; x++) {
      if(coin_array[x].x != -1) {
        paint_cell(coin_array[x].x, coin_array[x].y, "gold");
      }
    }

    //Lets paint the coinleft, step and building
    ctx.fillStyle = "red";
    ctx.font= "10px Arial";
    var coinstat = "Coin Left: " + coinleft;
    var stepstat = "Steps: " + step;
    ctx.fillText(coinstat, 330, 15);
    ctx.fillText(stepstat, 330, 30);

    ctx.fillStyle = "blue";
    var building = "ARMS";
    ctx.fillText(building, 108, 35);

    building = "PUSH";
    ctx.fillText(building, 40, 100);

    building = "RHPH";
    ctx.fillText(building, 35, 153);

    building = "JNSN";
    ctx.fillText(building, 80, 178);

    building = "SCHL";
    ctx.fillText(building, 115, 200);

    building = "HAAS";
    ctx.fillText(building, 30, 355);

    building = "AR";
    ctx.fillText(building, 35, 270);

    building = "BRNG";
    ctx.fillText(building, 40, 445);

    building = "STON";
    ctx.fillText(building, 90, 540);

    building = "CL50";
    ctx.fillText(building, 105, 380);

    building = "PSYC";
    ctx.fillText(building, 110, 335);

    building = "BELL";
    ctx.fillText(building, 165, 315);

    building = "C";
    ctx.fillText(building, 225, 320);

    building = "SC";
    ctx.fillText(building, 162, 380);

    building = "WTHR";
    ctx.fillText(building, 220, 385);

    building = "BRWN";
    ctx.fillText(building, 295, 375);

    building = "HEAV";
    ctx.fillText(building, 295, 405);

    building = "STEW";
    ctx.fillText(building, 255, 485);

    building = "PMU";
    ctx.fillText(building, 355, 510);

    building = "GRIS";
    ctx.fillText(building, 360, 405);

    building = "PORT";
    ctx.fillText(building, 275, 310);

    building = "MGL";
    ctx.fillText(building, 320, 320);

    building = "NUCL";
    ctx.fillText(building, 345, 340);

    building = "KNOY";
    ctx.fillText(building, 345, 280);

    building = "PGNW";
    ctx.fillText(building, 348, 155);

    ctx.rotate(Math.PI / 4);

    building = "WANG";
    ctx.fillText(building, 230, -145);

    building = "PHYS";
    ctx.fillText(building, 200, -80);

    building = "MSEE";
    ctx.fillText(building, 288, -80);

    building = "EE";
    ctx.fillText(building, 370, -70);

    building = "HOVD";
    ctx.fillText(building, 265, 70);

    building = "HAMP";
    ctx.fillText(building, 145, -33);

    building = "FRNY";
    ctx.fillText(building, 213, -33);

    ctx.rotate(-Math.PI / 4);

    ctx.rotate(-Math.PI / 4);

    building = "ELLT";
    ctx.fillText(building, -130, 290);

    building = "ME";
    ctx.fillText(building, 10, 370);

    ctx.rotate(Math.PI / 4);

    ctx.rotate(-Math.PI / 2);

    building = "LWSN";
    ctx.fillText(building, -292, 15);

    building = "MATH";
    ctx.fillText(building, -415, 75);

    building = "MTHW";
    ctx.fillText(building, -535, 45);

    building = "UNIV";
    ctx.fillText(building, -490, 115);

    building = "REC";
    ctx.fillText(building, -445, 115);

    ctx.rotate(Math.PI / 2);
  }

  function paint_cell(x, y, color)
  {
    ctx.fillStyle = color;
    ctx.fillRect(x*cw, y*cw, cw, cw);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x*cw, y*cw, cw, cw);
  }


  $(document).keydown(function(e){
    var key = e.which;
    if(key == "37" &&  player.x != 0 && map[player.y][player.x - 1] != 2) {
      player.x--;
      step++;
    } //Left
    else if(key == "38" && player.y != 0 && map[player.y - 1][player.x] != 2) {
      player.y--;
      step++;
    } //Up
    else if(key == "39" && player.x != 40 && map[player.y][player.x + 1] != 2) {
      player.x++;
      step++;
    } //Right
    else if(key == "40" && player.y != 55 && map[player.y + 1][player.x] != 2) {
      player.y++;
      step++;
    } //Down

    for(var x = 0; x < coin_num; x++) {
      if(player.x == coin_array[x].x && player.y == coin_array[x].y) {
        coinleft--;
        coin_array[x].x = -1;
      }
    }
  })

})
