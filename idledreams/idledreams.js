window.onload = pageReady;

function pageReady(){
	var gold = 0;
	var score = 0;
	var damage = 1;
	var health = 10;
	var maxhealth = 10;
	var reward = 10;
	var level = 1;
	var timeoutref;
	var multisOwned = 0;
	var multisCost = 5000;
	var ownedUpgrades = [];
	var boughtUpgradeColor = "lightgreen";
	
	//Buttons
	var mainButton = document.getElementById("theButton");
	
	//Shop buttons
	var swordButton = document.getElementById("sword-btn");
	var gauntletsButton = document.getElementById("gauntlets-btn");
	var amuletButton = document.getElementById("amulet-btn");
	var leggingsButton = document.getElementById("leggings-btn");
	var chainmailButton = document.getElementById("chainmail-btn");
	var helmetButton = document.getElementById("helmet-btn");
	var bootsButton = document.getElementById("boots-btn");
	var blessingButton = document.getElementById("blessing-btn");
	var prayerButton = document.getElementById("prayer-btn");
	var mltUpgradeButton = document.getElementById("mlt-upgrade-btn");
	
	//Level buttons
	var level1 = document.getElementById("lv-1");
	var level2 = document.getElementById("lv-2");
	var level3 = document.getElementById("lv-3");
	var level4 = document.getElementById("lv-4");
	var level5 = document.getElementById("lv-5");
	var level6 = document.getElementById("lv-6");
	var level7 = document.getElementById("lv-7");
	var level8 = document.getElementById("lv-8");
	var level9 = document.getElementById("lv-9");
	var level10 = document.getElementById("lv-10");
	var bonuslevel = document.getElementById("lv-bonus");
	
	//Output handles
	var monsterPic = document.getElementById("monster");
	var goldCounter = document.getElementById("gold-counter");
	var scoreCounter = document.getElementById("score-counter");
	var hpCounter = document.getElementById("hp-counter");
	var rewardMessage = document.getElementById("reward-message");
	var damageCounter = document.getElementById("damage-counter");
	var mltCost = document.getElementById("mlt-cost");
	var shopMessage = document.getElementById("shop-msg");
	var lvlFlash = document.getElementById("lvl-flash");
	var lvlFlashImg = document.getElementById("lvl-flash-img");
	var debug = document.getElementById("debug");
	
	//Button listeners
	mainButton.onclick = click;
	
	//Shop buttons
	//For anonymous functions I referenced: https://stackoverflow.com/questions/10355747/onclick-event-why-javascript-runs-it-onload
	swordButton.onclick = function(){ buyUpgrade(1); }
	gauntletsButton.onclick = function(){ buyUpgrade(2); }
	amuletButton.onclick = function(){ buyUpgrade(3); }
	leggingsButton.onclick = function(){ buyUpgrade(4); }
	chainmailButton.onclick = function(){ buyUpgrade(5); }
	helmetButton.onclick = function(){ buyUpgrade(6); }
	bootsButton.onclick = function(){ buyUpgrade(7); }
	blessingButton.onclick = function(){ buyUpgrade(8); }
	prayerButton.onclick = function(){ buyUpgrade(9); }
	mltUpgradeButton.onclick = function(){ buyUpgrade(10); }
	
	//Level buttons
	level1.onclick = function(){ switchLevel(1); }
	level2.onclick = function(){ switchLevel(2); }
	level3.onclick = function(){ switchLevel(3); }
	level4.onclick = function(){ switchLevel(4); }
	level5.onclick = function(){ switchLevel(5); }
	level6.onclick = function(){ switchLevel(6); }
	level7.onclick = function(){ switchLevel(7); }
	level8.onclick = function(){ switchLevel(8); }
	level9.onclick = function(){ switchLevel(9); }
	level10.onclick = function(){ switchLevel(10); }
	bonuslevel.onclick = function(){ switchLevel(11); }
	
	function click(){
		attack(damage);
		runMonsterAnimation();
	}
	function attack(dmg){
		
		if(level !== 11){
			health = health - dmg;
		
			if(health <= 0){
				gold = gold + reward;
				goldCounter.innerHTML = "Gold: " + gold;
				score = score + reward;
				scoreCounter.innerHTML = "Score: " + score;
				rewardMessage.innerHTML = "Reward: " + reward;
				health = maxhealth;
				hpCounter.innerHTML = "HP: " + health;
				return;			
			} else {
				hpCounter.innerHTML = "HP: " + health;
				return;
			}
		} else {//If level 11 which is the bonus level:
			gold = gold + damage;
			goldCounter.innerHTML = "Gold: " + gold;
		}
	}
	
	function switchLevel(lvl){
		/*Level 1: Goblin
		Level 2: Zombie
		Level 3: Knight
		Level 4: Wizard
		Level 5: Apple
		Level 6: Pizza
		Level 7: Ice cream
		Level 8: Hot dog
		Level 9: Pie
		Level 10: Triangle sandwich
		Bonus level: Treasure chest*/
		
		switch(lvl){
			case 1:
			switchMonster(10, 10, 1, "pictures/monsters/goblin.png");
			break;
			
			case 2:
			switchMonster(20, 20, 2, "pictures/monsters/zombie.png");
			break;
			
			case 3:
			switchMonster(40, 40, 3, "pictures/monsters/knight.png");
			break;
			
			case 4:
			switchMonster(80, 80, 4, "pictures/monsters/wizard.jpg");
			break;
			
			case 5:
			switchMonster(160, 160, 5, "pictures/monsters/apple.png");
			break;
			
			case 6:
			switchMonster(320, 320, 6, "pictures/monsters/pizza.png");
			break;
			
			case 7:
			switchMonster(640, 640, 7, "pictures/monsters/ice-cream.png");
			break;
			
			case 8:
			switchMonster(1300, 1300, 8, "pictures/monsters/hot-dog.jpg");
			break;
			
			case 9:
			switchMonster(2600, 2600, 9, "pictures/monsters/pie.png");
			break;
			
			case 10:
			switchMonster(5200, 5200, 10, "pictures/monsters/sandwich.png");
			break;
			
			case 11:
			level = 11;
			health = Math.pow(10, 1000);//Infinity
			hpCounter.innerHTML = "HP: Infinity";
			reward = null;
			rewardMessage.style.display = "none";
			monsterPic.src = "pictures/monsters/treasurechest.png";
			break;
		}
		return;
	}
	function switchMonster(hp, rew, lvl, url){
		level = lvl;
		health = hp;
		maxhealth = hp;
		hpCounter.innerHTML = "HP: " + health;
		reward = rew;
		rewardMessage.innerHTML = "Reward: " + reward;
		rewardMessage.style.display = "block";
		monsterPic.src = url;
	}
	function buyUpgrade(id){
		switch(id){
			case 1:
			//First validate that the item isn't owned by checking if it's in the array, then check if you have enough gold...
			if(hasItem("Sword") || !hasGold(gold, 10)){
				break;
			}
			//Update damage, update gold push array, and play the color switch animation
			buyValidatedUpgrade(2, 10, "Sword");
			swordButton.style.backgroundColor = boughtUpgradeColor;
			swordButton.style.WebkitAnimationPlayState = "running";
			swordButton.style.animationPlayState = "running";
			lvlFlashImg.src = "pictures/upgrades/diamond-sword.png";
			runLvlFlash();
			break;
			
			//Repeat eight times....
			case 2:
			if(hasItem("Gauntlets") || !hasGold(gold, 20)){
				break;
			}
			buyValidatedUpgrade(2, 20, "Gauntlets");
			gauntletsButton.style.backgroundColor = boughtUpgradeColor;
			gauntletsButton.style.WebkitAnimationPlayState = "running";
			gauntletsButton.style.animationPlayState = "running";
			lvlFlashImg.src = "pictures/upgrades/flame-gauntlet.png";
			runLvlFlash();
			break;
			
			case 3:
			if(hasItem("Amulet") || !hasGold(gold, 40)){
				break;
			}
			buyValidatedUpgrade(2, 40, "Amulet");
			amuletButton.style.backgroundColor = boughtUpgradeColor;
			amuletButton.style.WebkitAnimationPlayState = "running";
			amuletButton.style.animationPlayState = "running";
			lvlFlashImg.src = "pictures/upgrades/amulet-of-the-seas.png";
			runLvlFlash();
			break;
			
			case 4:
			if(hasItem("Leggings") || !hasGold(gold, 80)){
				break;
			}
			buyValidatedUpgrade(2, 80, "Leggings");
			leggingsButton.style.backgroundColor = boughtUpgradeColor;
			leggingsButton.style.WebkitAnimationPlayState = "running";
			leggingsButton.style.animationPlayState = "running";
			runLvlFlash();
			lvlFlashImg.src = "pictures/upgrades/the-flash.jpg";
			break;
			
			case 5:
			if(hasItem("Chainmail") || !hasGold(gold, 160)){
				break;
			}
			buyValidatedUpgrade(2, 160, "Chainmail");
			chainmailButton.style.backgroundColor = boughtUpgradeColor;
			chainmailButton.style.WebkitAnimationPlayState = "running";
			chainmailButton.style.animationPlayState = "running";
			lvlFlashImg.src = "pictures/upgrades/chainmail.png";
			runLvlFlash();
			break;
			
			case 6:
			if(hasItem("Helmet") || !hasGold(gold, 320)){
				break;
			}
			buyValidatedUpgrade(2, 320, "Helmet");
			helmetButton.style.backgroundColor = boughtUpgradeColor;
			helmetButton.style.WebkitAnimationPlayState = "running";
			helmetButton.style.animationPlayState = "running";
			lvlFlashImg.src = "pictures/upgrades/crown.jpg";
			runLvlFlash();
			break;
			
			case 7:
			if(hasItem("Boots") || !hasGold(gold, 640)){
				break;
			}
			buyValidatedUpgrade(2, 640, "Boots");
			bootsButton.style.backgroundColor = boughtUpgradeColor;
			bootsButton.style.WebkitAnimationPlayState = "running";
			bootsButton.style.animationPlayState = "running";
			lvlFlashImg.src = "pictures/upgrades/pegasus-boots.png";
			runLvlFlash();
			break;
			
			case 8:
			if(hasItem("Blessing") || !hasGold(gold, 1300)){
				break;
			}
			buyValidatedUpgrade(2, 1300, "Blessing");
			blessingButton.style.backgroundColor = boughtUpgradeColor;
			blessingButton.style.WebkitAnimationPlayState = "running";
			blessingButton.style.animationPlayState = "running";
			lvlFlashImg.src = "pictures/upgrades/sun.jpg";
			runLvlFlash();
			break;
			
			case 9:
			if(hasItem("Prayer") || !hasGold(gold, 2600)){
				break;
			}
			buyValidatedUpgrade(2, 2600, "Prayer");
			prayerButton.style.backgroundColor = boughtUpgradeColor;
			prayerButton.style.WebkitAnimationPlayState = "running";
			prayerButton.style.animationPlayState = "running";
			lvlFlashImg.src = "pictures/upgrades/prayer.png";
			runLvlFlash();
			break;
			
			// 50% multiplier upgrade; This is the only upgrade that you can buy infinitely. Each time you buy it, the cost doubles.
			case 10:
			if(!hasGold(gold, multisCost)){
				break;
			}
			damage = Math.floor(damage * 1.5);
			damageCounter.innerHTML = "Damage: " + damage;
			gold = gold - multisCost;
			goldCounter.innerHTML = "Gold: " + gold;
			multisOwned += 1;
			multisCost = multisCost * 2;
			bonuslevel.style.display = "inline-block";
			mltCost.innerHTML = "Cost: " + multisCost;
			lvlFlashImg.src = "pictures/upgrades/xp-mlt.jpg";
			runLvlFlash();
			break;
		}
	}
	
	/*Functions used in buyUpgrade*/
	function hasItem(item) {
		if(ownedUpgrades.includes(item)){
			shopMessage.style.display = "block";
			shopMessage.innerHTML = "You already own the " + item + "!";
			//For the time out, I referenced this code: https://stackoverflow.com/questions/1472705/resetting-a-settimeout
			clearTimeout(timeoutref);
			timeoutref = setTimeout(removeShopMsg, 3000);
			return true;
		}
		return false;
	}
	function hasGold(gld, cost) {
		if(gld < cost){
			shopMessage.style.display = "block";
			shopMessage.innerHTML = "Not enough gold!";
			clearTimeout(timeoutref);
			timeoutref = setTimeout(removeShopMsg, 3000);
			return false;
		}
		return true;
	}
	function buyValidatedUpgrade(mlt, cost, upname){
		damage = damage * mlt;
		damageCounter.innerHTML = "Damage: " + damage;
		gold = gold - cost;
		goldCounter.innerHTML = "Gold: " + gold;
		ownedUpgrades.push(upname);
		unlockLevel(ownedUpgrades.length + 1);
	}
	function unlockLevel(lvl){
		switch(lvl){
			case 2:
				level2.style.display = "inline-block";
			break;
			case 3:
				level3.style.display = "inline-block";
			break;
			case 4:
				level4.style.display = "inline-block";
			break;
			case 5:
				level5.style.display = "inline-block";
			break;
			case 6:
				level6.style.display = "inline-block";
			break;
			case 7:
				level7.style.display = "inline-block";
			break;
			case 8:
				level8.style.display = "inline-block";
			break;
			case 9:
				level9.style.display = "inline-block";
			break;
			case 10:
				level10.style.display = "inline-block";
			break;
			case 11:
				bonuslevel.style.display = "inline-block";
			break;
		}
	}
	function removeShopMsg(){
		shopMessage.style.display = "none";
		shopMessage.innerHTML = "";
	}
	
	/*Animation functions*/
	function hideFlash(){
		lvlFlash.style.display = "none";
	}
	function runLvlFlash(){
		lvlFlash.style.display = "block";
		lvlFlash.style.WebkitAnimationPlayState = "running";
		lvlFlash.style.animationPlayState = "running";
		var x = setTimeout(hideFlash, 3000);
	}
	function resetMonsterAnimation(){
		monsterPic.style.animation= "none";
	}
	function runMonsterAnimation(){
		/*Set monsterPic to default animation values*/
		monsterPic.style.animationName = "jiggle";
		monsterPic.style.animationDuration = "0.25s";
		monsterPic.style.WebkitAnimationPlayState = "running";
		monsterPic.style.animationPlayState = "running";
		var x = setTimeout(resetMonsterAnimation, 250);
	}
}