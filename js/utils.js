/*

Bresenham's algorithm relies on integer calculations to decide the pixels that form a line,
avoiding the use of floating-point arithmetic.

The algorithm manages an "error term" to determine when to step in the y-direction while
iterating along the x-direction (or vice versa).

It utilises conditional branching based on the error term to decide the next pixel.

*/

// Bresenham Line Drawing Algorithm with a chequered color fill
export function bresenhamLineChequered(ctx, x1, y1, x2, y2, color1, color2) {
    // Calculate the difference between the start and end points
    const dx = Math.abs(x2 - x1);
    const sx = x1 < x2 ? 1 : -1; // Determine the step direction for x-axis
    const dy = -Math.abs(y2 - y1);
    const sy = y1 < y2 ? 1 : -1; // Determine the step direction for y-axis
    let err = dx + dy; // Initialize the error term
    
    let toggle = true;  // Boolean to toggle between the two colors

    while (true) {
        // Set the fill color based on the toggle value
        ctx.fillStyle = toggle ? color1 : color2;
        // Draw a single pixel at the current position (x1, y1)
        ctx.fillRect(x1, y1, 1, 1);

        // Break the loop if the end point is reached
        if (x1 === x2 && y1 === y2) break;

        // Calculate the error term to determine the next point
        const e2 = 2 * err;
        if (e2 >= dy) {   // Adjust the error term and x position if needed
            err += dy;
            x1 += sx;
        }
        if (e2 <= dx) {   // Adjust the error term and y position if needed
            err += dx;
            y1 += sy;
        }

        // Alternate the color for the chequered pattern
        toggle = !toggle;
    }
}

export function deg_to_rad(degrees) {
    return degrees * (Math.PI / 180);
}