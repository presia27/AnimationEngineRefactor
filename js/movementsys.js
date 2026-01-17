/**
 * Movement system, written by Claude AI and
 * modified by Preston Sia (presia27)
 */
export class MovementSystem {
    constructor(position, speed = 200) {
        this.velocity = { x: 0, y: 0 };
        this.velocityCommand = null;
        this.position = position;
        this.speed = speed;
    }
    setVelocityCommand(command) {
        this.velocityCommand = command;
    }
    update(context) {
        if (this.velocityCommand) {
            const direction = this.velocityCommand.direction;
            const speed = this.velocityCommand.speed;
            this.velocity.x = direction.x * speed;
            this.velocity.y = direction.y * speed;
        }
        else {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
        this.position.x += this.velocity.x * context.clockTick;
        this.position.y += this.velocity.y * context.clockTick;
    }
    /**
     * Return a direction vector
     */
    getCurrentDirection() {
        const magnitude = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
        if (magnitude === 0)
            return { x: 0, y: 0 };
        return {
            x: this.velocity.x / magnitude,
            y: this.velocity.y / magnitude
        };
    }
}
