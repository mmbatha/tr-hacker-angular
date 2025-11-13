#!/bin/bash

# Clear the terminal and hide the cursor
clear
tput civis

# Define characters to use in the digital rain
chars=("ｱ" "ｲ" "ｳ" "ｴ" "ｵ" "ｶ" "ｷ" "ｸ" "ｹ" "ｺ" "ｻ" "ｼ" "ｽ" "ｾ" "ｿ" "0" "1" "2" "3" "4" "5" "6" "7" "8" "9" "A" "B" "C" "D" "E" "F" "G" "H" "I" "J" "K" "L" "M" "N" "O" "P" "Q" "R" "S" "T" "U" "V" "W" "X" "Y" "Z")
num_chars=${#chars[@]}

# Get terminal dimensions
rows=$(tput lines)
cols=$(tput cols)

# Initialize an array to store the state of each column
declare -a column_pos
for i in $(seq 0 $((cols - 1))); do
    column_pos[$i]=0 # Starting position of the falling character in each column
done

# Set colors (green for the main rain, brighter green for the head)
GREEN='\033[0;32m'
BRIGHT_GREEN='\033[1;32m'
RESET='\033[0m'

# Trap Ctrl+C to restore terminal and cursor
trap "tput cnorm; clear; exit" SIGINT

while true; do
    for col in $(seq 0 $((cols - 1))); do
        # Move cursor to current column and its falling character position
        tput cup ${column_pos[$col]} $col

        # Print a character in bright green at the current head position
        echo -ne "${BRIGHT_GREEN}${chars[$RANDOM % num_chars]}${RESET}"

        # If the character is not at the top, print a regular green character above it
        if [ ${column_pos[$col]} -gt 0 ]; then
            tput cup $((column_pos[$col] - 1)) $col
            echo -ne "${GREEN}${chars[$RANDOM % num_chars]}${RESET}"
        fi

        # Clear the character at the "tail" if it's past the screen
        if [ ${column_pos[$col]} -gt 2 ]; then # Adjust '2' for tail length
            tput cup $((column_pos[$col] - 2)) $col
            echo -ne " "
        fi

        # Update the position for the next frame
        column_pos[$col]=$((column_pos[$col] + 1))

        # Reset column position if it reaches the bottom
        if [ ${column_pos[$col]} -ge $rows ]; then
            column_pos[$col]=0
            # Optionally clear the entire column when it resets for a fresh start
            for r in $(seq 0 $((rows - 1))); do
                tput cup $r $col
                echo -ne " "
            done
        fi
    done
    sleep 0.05 # Adjust this value to control speed
done