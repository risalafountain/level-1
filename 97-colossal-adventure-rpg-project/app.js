//RPG Project
const readline = require ("readline-sync")
let inCombat = true 
let enemyAlive = true
let inventory = []
//Create an object for the player's information or do I need a CONSTRUCTOR FUNCTION to be able to print stats later?? 
const player = {
    name: "", 
    health: 100, 
    maxHealth: 100,  
    itemsOwned: [] //can i do this as an empty array? how do I put the items gained in here?
}

//print stats
function displayStats () {
    console.log(`\nName: ${userName}\nHealth: ${player.health} \nInventory: ${player.itemsOwned}`)
}


//Create constructor function for the monsters w/ their information
const enemies = []

function Enemy (name, maxHealth, description, health) {
    this.name = name
    this.maxHealth = maxHealth
    this.description = description
    this.health = health
}
const beserker = new Enemy("Beserker", 50, "Where there's one there's sure to be more! This agent of Chaos is looking for some fun.", 50)
//console.log(beserker)
const orc = new Enemy ("Orc", 60, "Will meat be back on the menu tonight?", 60) 
//console.log(orc)
const dragon = new Enemy("Baby Dragon", 45, "Alas! A worthy, albeit tiny, opponent!", 45)
const cucumber = new Enemy("Cucumber", 35, "Your companion seems really uncomfortable right now....not sure what's going on!", 35)
const velociraptor = new Enemy ("Velociraptor", 70, "You've seen too many Jurassic Park movies to not take this one seriously!", 70)
const vacuum = new Enemy ("Vacuum", 100, "The Greatest of all the monsters! For you it means chores---for your companion it means war!", 100)

enemies.push(beserker,dragon,cucumber,velociraptor,vacuum)
//console.log(enemies)

//generate random enemy
let randomEnemy
//inventory items: create an array of objects     
function Item (name, description) {
    this.name = name
    this.description = description
}

const amulet = new Item (" an Amulet of Zoomies", " This item makes you run real fast!") 
const laser = new Item (" a Laser Pointer", " This item is a great tool of distraction, deception, and aggravation!") 
const yarn = new Item (" a Ball of Yarn", " This item is made of Beskar--it sharpens claws and strengthens paws!") 
const collar = new Item (" a Collar", " This item protects against fleas and ticks for 30 days! Oh, it also wards off evil spirits NBD.") 
const shawl = new Item (" the Shawl of Protection", " Your Mommy made this--exclusively of mithiril ore! ") 

inventory.push(amulet, laser, yarn, collar, shawl)
//console.log(inventory)

//Greeting + Console Must Ask for the Player's Name and Store it
const userName = readline.question ("Hello, brave adventurer! My name is Puma Furman and I welcome you to the Land of Fancy Feast! Please state your name.     ");
console.log (`\nHello, ${userName}!`) 

//Choose companion
const companionChoice = readline.keyIn (`\nWe have three furry friends to choose as your companion! 
\nXena:\nA sleepy druid whose love of catnip drives her. A lover of the simple things in life like cuddles or a sunny day--one who will always stop to smell the po-tay-toes. 
\nZelda:\nA beautiful but fierce ranger whose expertise in the wild was instilled at a very young age. Always watching, always alert, always on her toes--her only weakness is her quesy stomach.  
\nGoku:\nA gluttonous bard always ready to lay on the charm or, if need be, defend the helpless. One who loves the pretty women, outdoors,  and singing the song of his people to anyone who approaches. \n\nChoose your Companion! \n(X)ena\n(Z)elda\n(G)oku   `, {limit: "gxz"})

//this is showing just the letter inputted how do i show the full name? RESOLVED
if (companionChoice === "x") {
    console.log(`Great Choice, ${userName}! Looks like you and Xena are ready for your adventure!`) 
    } else if (companionChoice === "z") {
        console.log(`Great Choice, ${userName}! Looks like you and Zelda are ready for your adventure!`)
    } else if (companionChoice === "g") {
        console.log(`Great Choice, ${userName}! Looks like you and Goku are ready for your adventure!`)
    }
   
//example of while loop
//condition should be true in order for while loop to run
let isPlaying = true
let hasWalked = false

//Use w to walk
while(isPlaying === true) {
    if (hasWalked) {
        const walkCmnd = readline.keyIn (`Press (w) to continue exploring `, {limit: "w"})        
        if(walkCmnd === "w"){
            walk()
    }
    } else {
        const beginGame = readline.keyIn (`Press (b) to begin exploring the Land of Fancy Feast! Good Luck on your adventure and may the odds be ever in your furver! `, {limit: "b"})
        if(beginGame === "b"){
            hasWalked =  true
            walk()}

    }
}


function walk() {
    //random algorithm to determine if enemy appeared
    const randomAppearance = Math.floor(Math.random() * 100)
    
    if (randomAppearance <= 25) {
        console.log("An enemy has appeared!")
        enemyAppeared()
        //enemy appeared function will be called here
        
    }else if(randomAppearance > 25) {
        console.log("No enemy has appeared!")
       }
}


function enemyAppeared() {
    //choose what to do (fight or run)
    randomEnemy = enemies [Math.floor(Math.random() * enemies.length)]

    console.log(`You've encountered a ${randomEnemy.name}!  ${randomEnemy.description}`)
    const fightOrFlight = readline.keyIn (`What would you like to do? \n(F)ight \n(R)un \n(I)nventory Check    `, {limit: "fri"})
    if (fightOrFlight === "f") {
        console.log("You have chosen to fight!")
        inCombat = true
        battle() 
    } else if (fightOrFlight === "r") {
        console.log("You have chosen to run!")
        run() //create function to show 50% chance of escaping 
    } else if (fightOrFlight === "i") {
        console.log("You have chosen to look at your inventory") //need to generate 
    }
}


function battle () {
    while (inCombat) {
        console.log(`${userName} ${player.health} ${player.maxHealth}\n${randomEnemy.name} ${randomEnemy.health} ${randomEnemy.maxHealth}`)
        readline.keyIn (`You are being attacked by ${randomEnemy.name}! Looks like you're clawing your way out of this one! \n (a)ttack  ` , {limit: "a"})
        playerAttack()
    }
}

function playerAttack() {
    const playerDamage = Math.floor(Math.random() * 50)
    randomEnemy.health = randomEnemy.health - playerDamage
    enemyHealth() //are you dead yet   
    
}

function enemyAttack (){
    const enemyDamage = Math.floor(Math.random () * 25)
    player.health = player.health - enemyDamage
    if (player.health <= 0) {
        console.log("game over")
        isPlaying = false
        inCombat = false
     } else {
        console.log("you survived")
     }
}


function enemyHealth() {
    if (randomEnemy.health <= 0) {
        console.log("Killed it")
        enemyAlive = false
        inCombat = false
        for (let i = 0; i < enemies.length; i++) {
            const element = enemies[i];
            if (element.health <= 0) {
              enemies.splice (i,i) //STOPPED HERE W/ ADAM   how do i remove the enemy once they have been unalived   
            }
        } 
    } else {
        console.log("Enemy has decided to attack")
        enemyAttack()
    }
}

    
function run () {
    const escapeChance = Math.floor(Math.random() * 100)

    if (escapeChance <= 50) {
        console.log("Oh wow! You run really fast!")
    } else {
        console.log("Oh No! The enemy has caught up to you!")
    }
}

//HOW DO I SAVE MY INVENTORY??????
//function inventoryOption () {
  //  const  checkInventory =  
//}

//generate random inventory item

//if they win get an inventoryItem 
const randomInventory = inventory [Math.floor(Math.random () * inventory.length)];
console.log(`YAY! You have gained ${randomInventory.name}! ${randomInventory.description}`)

  
//GAME OVER MSSGE IDEA 
// ________ <= This is your Heart Beat; 
//live long and pawspurr; 
//you have got to be kitten me right meow
//Throw yourself in next time, and then you will be no further nuisance! --Gandalf the Chartreux 
//


