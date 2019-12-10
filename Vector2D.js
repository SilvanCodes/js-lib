/**
 * This Vector2D class is used as a namespace for vector
 * transformation functions in 2D space. Instances of this
 * class are mere data containers. This library is meant
 * to be pure and immutable for comfortable programming.
 */
class Vector2D {
    constructor(x = 0, y = 0) {
        super();
        this.x = x;
        this.y = y;
    }

    /* log properly */

    toString() {
        return `Vector2D { x: ${this.x}, y: ${this.y} }`;
    }

    /* convenience functions */

    pipe(...fns) {
        return fns.reduce((v, f) => f(v), this);
    }

    split(...fns) {
        return fns.map(f => f(this));
    }

    /* computed data props */

    get norm() {
        return Math.sqrt(this.x**2 + this.y**2);
    }

    get inverse() {
        return new Vector2D(-this.x, -this.y);
    }

    /* namespaced transformations */

    static from(v) {
        return new Vector2D(v.x, v.y);
    }

    static rotate(alpha) {
        return v => new Vector2D(
            Math.cos(alpha) * v.x - Math.sin(alpha) * v.y,
            Math.sin(alpha) * v.x + Math.cos(alpha) * v.y
        );
    }

    static rotate90(clockwise = true) {
        return v => clockwise ? new Vector2D(v.y, -v.x) : new Vector2D(-v.y, v.x);
    }

    static add(v2) {
        return v1 => new Vector2D(
            v1.x + v2.x,
            v1.y + v2.y
        );
    }

    static sum(vectors) {
        const x = vectors.reduce((s, {x}) => s + x, 0);
        const y = vectors.reduce((s, {y}) => s + y, 0);
        return new Vector2D(x, y);
    }

    static mult(v2) {
        return v1 => new Vector2D(
            v1.x * v2.x,
            v1.y * v2.y
        );
    }

    static sub(v2) {
        return v1 => Vector2D.add(v2.inverse)(v1);
    }

    static dot(v2) {
        return v1 => v1.x * v2.x + v1.y * v2.y;
    }

    static det(v2) {
        return v1 => v1.x * v2.y - v1.y * v2.x;
    }

    // gives signed angle to rotate from v1 to v2
    static angleTo(v2) {
        return v1 => Math.atan2(V2D.det(v1)(v2), V2D.dot(v1)(v2));
    }

    // gives absolute angle between v1 and v2
    static angleBetween(v2) {
        return v1 => Math.acos(Vector2D.dot(v1)(v2) / (v1.norm * v2.norm));
    }

    static scale(s) {
        return v => new Vector2D(
            v.x * s,
            v.y * s
        );
    }

    static proximity(epsilon) {
        return v2 => v => v.x > v2.x - epsilon && v.x < v2.x + epsilon && v.y > v2.y - epsilon && v.y < v2.y + epsilon;
    }

    static resize(l) {
        return v => Vector2D.scale(l / v.norm)(v);
    }
}

// alias for less verbose access
const V2D = Vector2D;
