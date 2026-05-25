---
layout: page
title: Multi-Agent Warehouse Coverage & Cleaning
description: Efficient coverage and cleaning of unknown terrains using multiple ground robots — 2nd place at the AIITRA Robotics Challenge 2021.
img: assets/img/projects/multi_agent_coverage/aiitra2.png
importance: 1
category: competitions
---

The main objective of this project was to build an efficient multi-agent algorithm for cleaning an unknown terrain, for which we built [Vox-Bot](https://github.com/phoenixrider12/Vox-Bot), a ROS package for a multi-robot platform. This was our solution submitted for the AIITRA Robotics Challenge 2021, where we **secured second position** among all the participating IITs and other prestigious colleges of India.

<div class="row justify-content-sm-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/multi_agent_coverage/path.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

[**Code**](https://github.com/phoenixrider12/Vox-Bot) · [**Slides**](https://docs.google.com/presentation/d/15Tr9ttaVZmQwHbguTARzjeVO22R2nE5FTYrOWf2-XHw/edit?usp=sharing) · [**Abstract**](https://drive.google.com/file/d/1JusOGQFmkjaVjfD4kQLPCjKfHKlH5u1N/preview)

## Description

Vox-Bot is a four-wheeled robot with omni wheels for maximum agility and mobility. The primary purpose of the robot is to perform vacuum cleaning autonomously in an unknown terrain. It houses a LiDAR for mapping and an SBC for all computational needs, with one high-power brushless motor for vacuum generation and four brushed motors for the exhausts. For the vacuum system, we conducted multiple studies on the airflow, which can be found in the Airflow section. Below, we explain our solution to the problem statement.

<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/multi_agent_coverage/bot.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Vox-Bot CAD design.
</div>

## Pipeline

We modified the vanilla navigation stack offered by `move_base` in ROS, using `move_base_flex` to implement the architecture of the navigation stack below.

<div class="row justify-content-sm-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/multi_agent_coverage/pipeline.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Complete pipeline of our solution.
</div>

- We used [multirobot_map_merge](http://wiki.ros.org/multirobot_map_merge) with [rrt_exploration](http://wiki.ros.org/rrt_exploration) for mapping the environment.
- We used [polygon_planner](https://github.com/ethz-asl/polygon_coverage_planning) for planning the Boustrophedon path.
- The rest is custom-implemented, with Fortune's algorithm used for computing Voronoi diagrams. More details can be found in our [proposal](https://drive.google.com/file/d/1JusOGQFmkjaVjfD4kQLPCjKfHKlH5u1N/preview).

## Mapping

We used RRT exploration instead of standard frontier exploration to make it more efficient.

<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/multi_agent_coverage/mapping_time.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Comparison of exploration times with different numbers of bots.
</div>

## Optimal Coverage

We used Voronoi diagrams and a weighted-centroid algorithm to distribute the task between individual robots.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/multi_agent_coverage/voronoi.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/multi_agent_coverage/optimal_coverage.gif" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: generating Voronoi diagrams using Fortune's algorithm. Right: robots computing their path and optimal Voronoi cell.
</div>

## Boustrophedon Path

Generating Boustrophedon paths for the polygon given by the Voronoi cell each robot resides in.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/multi_agent_coverage/bpath1.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/multi_agent_coverage/bpath2.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Path distribution for Arena 1 (left) and Arena 2 (right).
</div>

## Airflow Study

The vacuum works on the principle of the lower fan creating a pressure difference to suck in air, while the exhaust pushes out the air from the upper compartment for efficient vacuum generation. The fan is placed low for efficient cleaning, with a ground clearance of approximately less than half the wheel radius.

We analyzed the vacuum mechanism using the SolidWorks Flow Simulation tool to understand the behavior of the vacuum during actual operation. The simulation required us to bound our rotating regions with circular bodies to define the rotation boundary. We defined the inlet and outlet velocities as 0.6 m/s and 0.15 m/s, below the bot and at the exhausts respectively. As the simulation was internal, the image only shows the flow inside the bot, but the trajectory of the arrows makes it evident that, in real-world scenarios, the Vox would be an efficient vacuum design.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/multi_agent_coverage/airflow-study.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/multi_agent_coverage/airflow-closeup.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: hypothetical system of the robot at full suction power. Right: airflow inside the central chamber.
</div>
