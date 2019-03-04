/*----------------------------------------------Character Start---------------------------------------------------------------------------------------------- */
// The entity's viewport is determined by its BoundingBox object.
let inventory = {
    hp: { value: 100, quantity: 1 },
    SilverKey: 1,
    GoldKey: 0
};

var world;

function Character(theCurrentWorld) {
    world = theCurrentWorld;                                                                                             //loop  reversed
    this.standAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterIdleAnimation.png"), 0, 0, 42, 42, 0.08, 4, true, false);
    this.walkRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterRightAnimation.png"), 0, 0, 42, 42, 0.15, 6, true, false);
    this.walkUpLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"), 32, 32, 33, 32, 1.04, 1, true, false);
    this.walkLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterLeftAnimation.png"), 0, 0, 42, 42, 0.15, 6, true, false);
    this.walkUpRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"), 32, 64, 33, 32, 1.04, 1, true, false);
    this.walkUpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterBackwardRun.png"), 0, 0, 42, 42, 0.15, 5, true, false);
    this.walkDownLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"), 32, 96, 32, 32, 1.04, 1, true, false);
    this.walkDownAnimation = new Animation(ASSET_MANAGER.getAsset("./img/CharacterForwardRun.png"), 0, 0, 42, 42, 0.15, 5, true, false);
    this.walkDownRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"), 32, 128, 32, 32, 1.04, 1, true, false);
    this.attackUpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterUpAttack.png"), 0, 0, 42, 42, 0.04, 3, false, false);
    this.attackDownAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterDownAttack.png"), 0, 0, 42, 42, 0.04, 3, false, false);
    this.attackLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterLeftAttack.png"), 0, 0, 42, 42, 0.04, 3, false, false);
    this.attackRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterRightAttack.png"), 0, 0, 42, 42, 0.04, 3, false, false);
    this.whirlwindAttackAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterWhirlWindAttackAnimation.png"), 0, 0, 42, 42, 0.04, 4, false, false);
    this.animation = this.standAnimation; // initial animation.
    this.isAttacking = false;
    this.isWhirlwinding = false;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.isMovingUpLeft = false;
    this.isMovingUpRight = false;
    this.isMovingDownLeft = false;
    this.isMovingDownRight = false;
    this.radius = 100;
    this.inventory = inventory;
    this.level = 1;
    this.soul = 1;
    this.travelSpeed = 2;
    this.killable = true;
    this.maxHealth = 1000 + 1000 * (this.level - 1) * 0.2;
    this.currentHealth = 1000;
    this.currentSoul = 0;
    this.levelSoul = this.soul * 150;
    this.baseDamge = 10;
    this.currentExp = 0;
    this.levelExp = this.level * 100;
    this.scale = 1; // set to 1 if the sprite dimensions are the exact size that should be rendered.
    this.boundingBox = new BoundingBox(0, 0, 20, 40, 10);
    //console.log(this); // Debugging.
    Entity.call(this, gameEngine, 385, 450, false); // Spawn the entity's upper left corner at these coordinates of the world.
}

Character.prototype = new Entity();

Character.prototype.updateViewport = function () {
    let sx = this.game.viewport.sx;
    let sy = this.game.viewport.sy;
    // Calculates the position with the given scale.
    this.game.viewport.x = (this.x + this.boundingBox.width) * sx - this.game.ctx.canvas.width / 2;
    this.game.viewport.y = (this.y + this.boundingBox.height / 2) * sy - this.game.ctx.canvas.height / 2;
}

Character.prototype.update = function () {
    this.isMovingUp = false;
    this.isMovingLeft = false;
    this.isMovingDown = false;
    this.isMovingRight = false;
    this.isMovingUpLeft = false;
    this.isMovingUpRight = false;
    this.isMovingDownLeft = false;
    this.isMovingDownRight = false;
    if (this.game.one) { this.isWhirlwinding = true; }
    if (this.game.click) { this.isAttacking = true; }
    if (this.game.up && this.game.left) this.isMovingUpLeft = true;
    if (this.game.up && this.game.right) this.isMovingUpRight = true;
    if (this.game.down && this.game.left) this.isMovingDownLeft = true;
    if (this.game.down && this.game.right) this.isMovingDownRight = true;
    if (this.game.left && !collisionDetect(this.x + 8 - this.travelSpeed, world.currentScale - 5 + this.y, 25)) { this.isMovingLeft = true }//
    if (this.game.right && !collisionDetect(this.x + 8 + this.travelSpeed, world.currentScale - 5 + this.y, 25)) { this.isMovingRight = true }
    if (this.game.up && !collisionDetect(this.x + 8, 25 + this.y - this.travelSpeed, 25)) {
        this.isMovingUp = true;
    }
    if (this.game.down && !collisionDetect(this.x + 8, world.currentScale + this.y, 25)) {
        this.isMovingDown = true;
    }
    if (this.game.debug && (this.isMovingLeft || this.isMovingRight || this.isMovingUp || this.isMovingDown)) {
        // console.log(this);
    }
    if (this.isMovingUp) {
        this.y -= this.travelSpeed; // Moves the entity.
    } else if (this.isMovingDown) {
        this.y += this.travelSpeed; // Moves the entity.
    }
    if (this.isMovingLeft) {
        var speed = this.travelSpeed;
        this.x -= this.travelSpeed; // Moves the entity.
    } else if (this.isMovingRight) {
        var speed = this.travelSpeed;
        this.x += this.travelSpeed; // Moves the entity.
    }
    // The boundingBox follows the entity.
    this.boundingBox.x = this.x;
    this.boundingBox.y = this.y;

    this.updateViewport();

    if (this.isAttacking) {
        if (this.attackRightAnimation.isDone()) {
            this.attackRightAnimation.elapsedTime = 0
            this.isAttacking = false;
        }
        if (this.attackLeftAnimation.isDone()) {
            this.attackLeftAnimation.elapsedTime = 0
            this.isAttacking = false;
        }
        if (this.attackUpAnimation.isDone()) {
            this.attackUpAnimation.elapsedTime = 0
            this.isAttacking = false;
        }
        if (this.attackDownAnimation.isDone()) {
            this.attackDownAnimation.elapsedTime = 0
            this.isAttacking = false;
        }
    }
    if (this.isWhirlwinding) {
        if (this.whirlwindAttackAnimation.isDone()) {
            this.whirlwindAttackAnimation.elapsedTime = 0
            this.isWhirlwinding = false;
        }
    }
    if (this.game.used === 'hp' && this.inventory['hp'].quantity > 0) {
        this.currentHealth = Math.min(this.currentHealth + this.inventory['hp'].value, this.maxHealth);
        this.inventory['hp'].quantity -= 1;
        this.game.used = null;
    }
    Entity.prototype.update.call(this);
}

Character.prototype.draw = function (ctx) {
    if (this.isAttacking) {
        if (this.isMovingUp) {
            this.animation = this.attackUpAnimation;
        } else if (this.isMovingLeft) {
            this.animation = this.attackLeftAnimation;
        } else if (this.isMovingRight) {
            this.animation = this.attackRightAnimation;
        } else {
            this.animation = this.attackDownAnimation;
        }
    } else if (this.isWhirlwinding) {
        this.animation = this.whirlwindAttackAnimation;
    } else if (this.isMovingUpLeft) {
        this.animation = this.walkLeftAnimation;
    } else if (this.isMovingUpRight) {
        this.animation = this.walkRightAnimation;
    } else if (this.isMovingDownLeft) {
        this.animation = this.walkLeftAnimation;
    } else if (this.isMovingDownRight) {
        this.animation = this.walkRightAnimation;
    } else if (this.isMovingUp) {
        this.animation = this.walkUpAnimation;
    } else if (this.isMovingDown) {
        this.animation = this.walkDownAnimation;
    } else if (this.isMovingLeft) {
        this.animation = this.walkLeftAnimation;
    } else if (this.isMovingRight) {
        this.animation = this.walkRightAnimation;
    } else {
        this.animation = this.standAnimation;
    }

    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    if (this.game.debug) {
        ctx.strokeStyle = "green";
        ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
        //ctx.strokeStyle = "orange";
        //ctx.strokeRect(this.x, this.y, this.animation.frameWidth*this.scale, this.animation.frameHeight*this.scale); //
        //console.log('BoundingBox: ' + this.boundingBox.x + ',' + this.boundingBox.y); // Debugging.
        for (var i = 0; i < leafs.length; i++) {
            ctx.strokeStyle = "red";
            ctx.strokeRect(leafs[i].x, leafs[i].y, leafs[i].w, leafs[i].h);
            ctx.strokeStyle = "green";
            for (var j = 0; j < leafs[i].walls.length; j++)
                ctx.strokeRect(leafs[i].walls[j].x, leafs[i].walls[j].y, 48, 48);
        }
    }

    Entity.prototype.draw.call(this);
    let scaleOf = 4;
    let range = (this.isWhirlwinding) ? world.currentScale * 1.5 : (this.isAttacking) ? world.currentScale / 2 : 0;
    let newX = this.x;
    let newY = this.y;
    switch (this.animation) {
        case this.attackLeftAnimation:
            newX -= world.currentScale / 2;
            break;
        case this.attackRightAnimation:
            newX += world.currentScale / 10;
            break;
        case this.attackDownAnimation:
            newY -= world.currentScale / 5;
            break;
        case this.attackUpAnimation:
            newY += world.currentScale / 5;
            break;
        case this.whirlwindAttackAnimation:
            newX -= world.currentScale;
            newY -= world.currentScale;
        default: break;
    }//SorcererVillain

    if (new Date().getTime() - damageST.time > 500) { damageST.damaged = 0; damageST.exp = 0; } //hide

    for (let i = 0; i < gameEngine.entities.length; i++) {//
        if (gameEngine.entities[i] instanceof Character == true || typeof gameEngine.entities[i] === 'undefined') continue;
        scaleOf = (gameEngine.entities[i] instanceof Projectile) ? 4 : world.currentScale - 10;
        if (isCollide(newX + 20, newY - scaleOf + 20, 5 + range, 42 + range, gameEngine.entities[i], scaleOf + range, scaleOf + range)) {
            if (gameEngine.entities[i] instanceof Projectile) {
                gameEngine.entities.splice(i, 1); this.currentHealth -= 5; break;
            }
            if (gameEngine.entities[i] instanceof SilverKey) { this.inventory['SilverKey'] += 1; gameEngine.entities.splice(i, 1); break; }
            if (gameEngine.entities[i] instanceof GoldKey) { this.inventory['GoldKey'] += 1; gameEngine.entities.splice(i, 1); break; }
            if (gameEngine.entities[i] instanceof HealingPotion) { this.inventory['hp'].quantity += 1; gameEngine.entities.splice(i, 1); break; }
            if (gameEngine.entities[i] instanceof SoulJar) {
                let jar = (gameEngine.entities[i] instanceof SoulJar) ? gameEngine.entities[i].jar : 0;
                this.currentSoul += jar;
                if (jar > 0 || heal > 0) {
                    gameEngine.entities[i].killed = true;
                    let xOrigC = (character.x + character.animation.frameWidth / 2 - 380 + 100);
                    let yOrigC = (character.y + character.animation.frameHeight / 2 - 380 + 60);
                    let xOrigS = (gameEngine.entities[i].x)
                    let yOrigS = (gameEngine.entities[i].y)
                    let xDiff = xOrigC - xOrigS;
                    let yDiff = yOrigC - yOrigS;
                    let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
                    gameEngine.entities[i].toX = (10 * xDiff) / distance;
                    gameEngine.entities[i].toY = (10 * yDiff) / distance;
                    gameEngine.entities[i].x += (50 * xDiff) / distance;
                    gameEngine.entities[i].y += (50 * yDiff) / distance;
                    break;
                }
            }
            let damage = 0;
            if (this.game.click || this.game.isWhirlwinding || this.game.isAttacking) {
                this.game.click = false;
                damage = this.baseDamge * (1 + (this.level - 1) * 0.1 + this.soul);
                gameEngine.entities[i].currentHealth -= damage;
                damageST.x = gameEngine.entities[i].x;
                damageST.y = gameEngine.entities[i].y;
                damageST.damaged = damage;
                damageST.time = new Date().getTime();
                bug = 0;
            }
            this.currentHealth -= 10; //console.log('cross by enemy');
            if (gameEngine.entities[i].currentHealth <= 0 || gameEngine.entities[i].currentHealth == null) {
                if (gameEngine.entities[i].death === null)
                    gameEngine.entities.splice(i, 1);
                else {
                    gameEngine.entities[i].animation = gameEngine.entities[i].death;
                    gameEngine.entities[i].killable = false;
                }
                this.currentExp += (this.level + 1) * 20; // may change the formular later
                damageST.exp = (this.level + 1) * 20;
            }
            if (bug <= 8) { this.currentHealth += 10; bug++; }
        }

        else if (gameEngine.entities[i] instanceof Projectile == true && collisionDetect(gameEngine.entities[i].x, gameEngine.entities[i].y, world.currentScale)) {
            gameEngine.entities.splice(i, 1);
        }
    }
    
    if (this.currentHealth <= 0) {//check here if got bug
        gameEngine.entities.splice(gameEngine.entities.length - 1, 1);
        let text = document.getElementById('gameover');
        text.style.display = 'inline';
        let tPos = text.getBoundingClientRect();
        let cPos = gameEngine.ctx.canvas.getBoundingClientRect();
        let x = cPos.left + (cPos.width - tPos.width) / 2
        let y = cPos.top + (cPos.height - tPos.height) / 2
        //console.log(tPos);
        text.style.position = 'absolute';
        text.style.left = x + 'px';
        text.style.top = y + 'px';
    }
    drawHPBar();
}
/*----------------------------------------------Character End---------------------------------------------------------------------------------------------- */
