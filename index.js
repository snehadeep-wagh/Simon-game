// Name - Snehadeep Wagh

function createRandomNumber()
{
    var rand = Math.random() * 4;
    rand = Math.floor(rand);
    return rand + 1;
}

//  array to store random colors
var colors = [];

// check if game over
var flag = false;
let level = 0;
var idx = 0;

function startTheGame()
{
    level = 1;
    $("#level-title").text("Level " + level)

    colors = [];
    colors.push(getRamdonColor());
    setTimeout(function(){playSound(colors[level-1]);}, 10)
    console.log(colors);
    return;
}

function nextLevel()
{
    level +=1;
    $("#level-title").text("Level " + level)
    colors.push(getRamdonColor());
    setTimeout(function(){playSound(colors[level-1]);}, 10)
    console.log(colors);
    return;
}

// start game by pressing any key
$(document).keydown(function(event)
{
    if(!flag)
    {
        flag = true;
        startTheGame();

        $(".btn").click(function(){
            var col = $(this).attr("id");
            playSound(col);

            checkAns(col, level); 
        })
    }
})

function checkAns(col, lev)
{
    console.log("level: " + lev + "col: " + col);
    if(idx <= lev-1)
    {
        if(colors[idx] != col)
        {
            idx = 0;

            // change background color
            $("body").addClass("game-over")
            setTimeout(function(){
            $("body").removeClass("game-over")
            }, 300)

            // change heading
            $("#level-title").text("Game Over :(")
            setTimeout(function(){
                location.reload();
            }, 1000)
        }
        else
        {
            if(idx == level - 1)
            {
                setTimeout(function(){
                    nextLevel();
                }, 500)
                idx = 0;
            }
            else
            {
                idx++;
            }
        }
    }
}

function getRamdonColor()
{
    var val = createRandomNumber();
    console.log("Random: " + val);
    switch(val)
    {
        case 1 :
            return "green";
        case 2 :
            return "red";
        case 3 :
            return "yellow";
        case 4 :
            return "blue";
    }
}

function playSound(key)
{
    switch(key)
    {
        case "red":
            var sound = new Audio("sounds/red.mp3");
            sound.play();
            break;
        case "yellow":
            var sound = new Audio("sounds/yellow.mp3");
            sound.play();
            break;
        case "green":
            var sound = new Audio("sounds/green.mp3");
            sound.play();
            break;
        case "blue":
            var sound = new Audio("sounds/blue.mp3");
            sound.play();
            break;
        default:
            console.log("Wrong input: " + key);
    }

    // For animation
    $("." + key).addClass("pressed");
        console.log(key);
        setTimeout(function(){
            $("." + key).removeClass("pressed");
        }, 300)

}
