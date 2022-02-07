class Tableau1 extends Phaser.Scene {

    preload(){
        this.load.image('carre','assets/carre.png')
        this.load.image('cercle','assets/cercle.png')

    }

    create(){
        this.hauteur = 800
        this.largeur = 800
        this.speedX = 0
        this.maxspeed = 500



        while(this.speedX===0){
            this.speedX = 500*Phaser.Math.Between(-1,1)
        }
        this.speedY = Phaser.Math.Between(-500, 500)










        this.wall = this.physics.add.sprite(10,300,'carre')
        this.wall.setDisplaySize(20,1000)
        this.wall.setImmovable(true);
        this.wall.body.setAllowGravity(false)

        this.wall1 = this.physics.add.sprite(790,300,'carre')
        this.wall1.setDisplaySize(20,1000)
        this.wall1.setImmovable(true);
        this.wall1.body.setAllowGravity(false)

        this.wall2 = this.physics.add.sprite(300,10,'carre')
        this.wall2.setDisplaySize(1000,20)
        this.wall2.setImmovable(true);
        this.wall2.body.setAllowGravity(false)


        this.raquette = this.physics.add.sprite(400,750,'carre')
        this.raquette.setDisplaySize(200,20)
        this.raquette.setImmovable(true);
        this.raquette.body.setAllowGravity(false)



        this.balle = this.physics.add.sprite(400,400, 'cercle')
        this.balle.setDisplaySize(20, 20)
        this.balle.body.setSize(80, 80);
        this.balle.body.setBounce(1, 1);
        this.balle.body.setAllowGravity(false)

        for(let y=0;y<5;y++){
            for(let x=0;x<9;x++){
                let brick = this.physics.add.sprite(150 + x*62, 150 + y*32, 'carre')
                brick.setDisplaySize(60,30)
                brick.setImmovable(true);
                brick.body.setAllowGravity(false)
                this.physics.add.collider(brick, this.balle,function(){
                    console.log('touche brique')
                    //me.rebond(me.raquette)
                })


                console.log("brique",x,y)
            }

        }
        this.brickr = this.physics.add.sprite(398.3, 246, 'carre')
        this.brickr.setDisplaySize(60,30).setTintFill(0xFF0303)


        this.brickv = this.physics.add.sprite(335.5, 246, 'carre')
        this.brickv.setDisplaySize(60,30).setTintFill(0x21ff00 )

        let me = this;
        this.physics.add.collider(this.raquette, this.balle,function(){
            console.log('touche player')
            me.rebond(me.raquette)
        })





        this.physics.add.collider(this.balle, this.wall)
        this.physics.add.collider(this.balle, this.wall1)
        this.physics.add.collider(this.balle, this.wall2)
        this.physics.add.collider(this.balle, this.raquette)


        this.balle.setMaxVelocity(this.maxspeed,this.maxspeed)

        this.raquetteSpeed = 0

        this.brickr.setImmovable(true);
        this.brickr.body.setAllowGravity(false)
        this.physics.add.collider(this.brickr, this.balle)
        this.physics.add.collider(this.brickr, this.balle,function(){
            console.log('touche player')
            me.rebond(me.raquette)
        })
        this.brickv.setImmovable(true);
        this.brickv.body.setAllowGravity(false)
        this.physics.add.collider(this.brickv, this.balle)
        this.physics.add.collider(this.brickv, this.balle,function(){
            console.log('touche player')
            me.rebond(me.raquette)
        })

        this.balleAucentre();

        this.initKeyboard();


    }


    rebond(players){
        let me = this;
        console.log(this.raquette.x);
        console.log(me.balle.x);
        let hauteurPlayers = players.displayHeight;

        let positionRelativePlayers = (this.balle.x + players.x);

        positionRelativePlayers= (positionRelativePlayers / hauteurPlayers)
        positionRelativePlayers = positionRelativePlayers*1-1;
        this.balle.setVelocityX(this.balle.body.velocity.x + positionRelativePlayers);

    }

    balleAucentre(){
        this.balle.x = this.largeur/2
        this.balle.y = this.hauteur/2
        this.speedX = 0

        this.balle.setVelocityY(Math.random()>-0.5?-300:300)
        this.balle.setVelocityX(0)

        this.raquette.x=this.largeur/2-50

    }



    update(){

        this.raquette.x += this.raquetteSpeed
    }

    initKeyboard(){
        let me = this
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.raquetteSpeed = -5
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.raquetteSpeed = 5
                    break;
            }
        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.raquetteSpeed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.raquetteSpeed = 0
                    break;
            }
        });
    }


}