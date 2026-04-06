#!/bin/bash
for d in 13_altitudes 14_oceana_bespoke 15_volt_rider 16_abyss_explorations 17_pulse_grid 18_velocity_rail; do
    echo "Fixing R3F in $d..."
    cd "$d"
    npm install @react-three/fiber@8 @react-three/drei@9 three@0.160.0 --legacy-peer-deps
    cd ..
done
echo "Fixed all!"
