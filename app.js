new Vue({
    el:'#app',
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning:false,
        turns:[]
    },
    methods: {
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth =100;
            this.turns = [];
        },
        attack: function(){
            var damage = this.calDamage(10, 3);
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer:true,
                text: 'Player hit Monster for '+ damage
            })
            if(this.checkWin()){
                return;
            }
            this.monsterAttacks();

        },
        specialAttack: function(){
            var damage = this.calDamage(20, 10);
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer:true,
                text: 'Player hit Monster hard for '+ damage
            })
            if(this.checkWin()){
                return;
            }
            this.monsterAttacks();

        },
        heal: function(){            
            if(this.playerHealth <= 90){
                this.playerHealth += 10
            }
            else{
                this.playerHealth = 100
            }
            this.turns.unshift({
                isPlayer:true,
                text: 'Player heals for 10'
            })
            this.monsterAttacks()
        },
        giveUp: function(){
            this.gameIsRunning = false;
        },
        calDamage: function(max, min){
           return Math.max(Math.floor(Math.random()*max), min);

        },
        monsterAttacks: function(){
            var damage = this.calDamage(12, 5);
            this.playerHealth -= damage
            this.turns.unshift({
                isPlayer:false,
                text: 'Monster hit Player for '+ damage
            })
            this.checkWin();
        },
        checkWin: function(){
            if(this.monsterHealth <=0 ){
                if(confirm('You won! Start New Game?')){
                    this.startGame();
                }
                else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            else if(this.playerHealth <=0 ){
                if(confirm('You Lost! Start New Game?')){
                    this.startGame();
                }
                else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
            
        }
    },

});