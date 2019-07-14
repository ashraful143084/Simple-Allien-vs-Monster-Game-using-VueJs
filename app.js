new Vue({
	el: '#app',
	data:{
		allienHealth:100,
		monsterHealth:100,
		gameIsRunning: false,
		turns: []
	},
	methods:{
		starGame: function(){
			this.gameIsRunning = true;
			this.monsterHealth = 100;
			this.allienHealth = 100;
			this.turns = []

		},
		attack: function(){
			// var max = 10;
			// var min = 3;
			// var damage = Math.max(Math.floor(Math.random() * max) + 1,min);
			var damage = this.calculateDamage(3,10);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isAllien: true,
				text: 'Allien attack Monster for ' + damage
			});
			if (this.checkWin()) {
				return;
			}

			// if (this.monsterHealth <= 0) {
			// 	alert('Allien Won !!!!');
			// 	this.gameIsRunning = false;
			// 	return;
			// }

			// max = 12;
			// min = 5;
			// damage =  Math.max(Math.floor(Math.random() * max) + 1,min);
			this.monsterAttack();
			// this.allienHealth -= this.calculateDamage(5,12);

			// if (this.allienHealth <= 0 ) {
			// 	alert('Monster Won !!!!');
			// 	this.gameIsRunning = false;
			// }
			// this.checkWin();


		},
		specialAttack: function(){
			var damage = this.calculateDamage(10,20);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isAllien: true,
				text: 'Allien attack hard Monster for ' + damage
			});
			if (this.checkWin()) {
				return;
			}

			this.monsterAttack();
		},
		heal: function(){
			if (this.allienHealth <=90) {
				this.allienHealth +=10;
			}else{
				this.allienHealth = 100;
			}

			this.turns.unshift({
				isAllien: true,
				text: 'Allien heals for 10'
			});

			this.monsterAttack();
		},
		giveUp: function(){
			this.gameIsRunning = false;
		},
		monsterAttack: function(){
			var damage = this.calculateDamage(5,12)
			this.allienHealth -= damage;
			this.turns.unshift({
				isAllien: false,
				text: 'Monster attack Allien for ' + damage
			});
			this.checkWin();
		},
		calculateDamage: function(min,max){
			return Math.max(Math.floor(Math.random() * max) + 1,min);
		},
		checkWin: function(){
			if (this.allienHealth <=0) {
				if(confirm('Monster won ! Start New Game')){
					this.starGame();
				}else{
					this.gameIsRunning = false;
				}
				return true;
			}else if (this.monsterHealth <=0) {
				if (confirm('Allien Won ! Start New Game')) {
					this.starGame();
				}else{
					this.gameIsRunning=false;
				}

				return true;
			}
			return false;
		}
	}
	
});