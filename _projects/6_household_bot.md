---
layout: page
title: Multi-Purpose Household Robot
description: A fully ROS-integrated mobile robot for everyday household tasks — autonomous navigation, vacuum cleaning, and deep-learning abilities like human following and threat detection.
img: assets/img/projects/household_bot/mphb.gif
importance: 3
category: research
---

A fully ROS-integrated mobile robot designed and fabricated to help with the day-to-day activities of an average household. The bot autonomously navigates indoor environments using vision data from an onboard RGB-D camera and is equipped with a vacuum-cleaning system. Beyond navigation, it uses deep-learning algorithms for human following, face recognition, and threat detection — with applications ranging from baby monitoring to security and surveillance.

<div class="row justify-content-sm-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/household_bot/intro.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

[**Code**](https://github.com/phoenixrider12/Multi-Purpose-HouseHold-Bot) · [**Slides**](https://www.canva.com/design/DAE3BJOFKVE/YP8B9n0kyKdZ_BZMwp6ItQ/view)

## Simulation

We first designed the bot in SolidWorks and conducted tests such as airflow analysis to determine its durability and performance. We then exported the model as URDF into the Gazebo physics simulator, where we tested all our navigation and machine-learning algorithms.

### Hardware Design

The CAD model was created in SolidWorks, and a URDF was generated considering the motion along all controllable links to be simulated in ROS. The vacuum system is based on a centrifugal pump. We conducted two tests to ensure the bot's functioning:

1. **Airflow** (CFD — Computational Fluid Dynamics)
2. **Stress Analysis** (FEA — Finite Element Analysis)

<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/household_bot/cad.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Household bot CAD design.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/household_bot/vel_flow.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/household_bot/pressure_flow.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Velocity and pressure flow from the CFD analysis.
</div>

### Features

**Autonomous Navigation** — using onboard RGB-D camera data with the [ROS Navigation Stack](https://wiki.ros.org/navigation), the bot can perform:

1. **Teleop control** — manual keyboard control.
2. **Exploration** — autonomously map a new household.
3. **Navigation** — navigate the house while avoiding static and dynamic obstacles.
4. **Autonomous coverage** — cover and clean the house with its vacuum mechanism.

**ML Integration** — deep-learning models enable:

1. **Baby following** — estimate the baby's position and follow its center while constantly monitoring it.
2. **Threat detection** — detect potential threats (e.g., knives) using object detection.
3. **Human recognition** — recognize known faces and trigger an alarm for unknown/blacklisted persons.

<div class="row">
    <div class="col-sm">
        <iframe width="100%" height="300" src="https://www.youtube.com/embed/VNN0Ax7Z45M" title="Autonomous navigation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="col-sm">
        <iframe width="100%" height="300" src="https://www.youtube.com/embed/6_u_bhtJj-0" title="ML integration" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>

## Hardware

We fabricated the bot using the following components: NVIDIA Jetson Nano, STM32 microcontroller, 12 V DC motors, an L293D motor driver, a 5500 mAh 12 V battery, and a 5 V 10000 mAh power bank.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/household_bot/bot.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/household_bot/bot_components.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row">
    <div class="col-sm">
        <iframe width="100%" height="300" src="https://www.youtube.com/embed/iRmxcP1PFLo" title="Hardware demo 1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="col-sm">
        <iframe width="100%" height="300" src="https://www.youtube.com/embed/FTm5Lri4exU" title="Hardware demo 2" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>
