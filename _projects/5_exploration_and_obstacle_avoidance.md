---
layout: page
title: Multi-Agent Exploration & Dynamic Obstacle Avoidance
description: An RRT-exploration and visual obstacle-detection pipeline for multi-robot mapping with dynamic map updates.
img: assets/img/projects/exploration_and_obstacle_avoidance/iisc_project.png
importance: 2
category: research
---

In this project we developed a multi-robot mapping pipeline that can be used for manual or autonomous mapping of unknown terrains with multiple robots, without any prior information about the environment. Once the map is prepared, we incorporate dynamic environment changes into the occupancy grid using knowledge gained from camera sensors. This work was done during my research internship at RBBCPS, IISc.

<div class="row justify-content-sm-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/exploration_and_obstacle_avoidance/nav_test_ss.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

[**Code**](https://github.com/phoenixrider12/Multi-VOLTA-Exploration-and-Dynamic-Map-Updates) · [**Slides**](https://docs.google.com/presentation/d/1aI4XAEJ03-eVSFvvPp1vc2dhd3e40BZHbnoN6kscu6A/edit?usp=sharing)

## Manual Multi-Robot Mapping

For manual multi-robot mapping, we use standard LiDAR-based SLAM (Gmapping) for each individual robot to build its own map, then merge them into a global map. The merging uses a feature-matching algorithm that detects overlapping features and combines maps with or without knowing the initial pose of any robot. More details can be found [here](http://wiki.ros.org/multirobot_map_merge).

<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/exploration_and_obstacle_avoidance/map_merge.gif" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Map merging.
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm-8">
        <iframe width="100%" height="360" src="https://www.youtube.com/embed/nefMJ8caYpQ" title="Manual multi-robot mapping" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>

## Multi-Robot Exploration

Exploration is preferred while mapping because the robots can autonomously generate a map without human effort. The classical approach finds frontier points on the edges of the occupancy grid and forwards them as goals to the robot. In our approach, we use **RRT (Rapidly-exploring Random Trees) exploration**, where a modified RRT algorithm detects frontier points and has proven much faster than standard exploration. We run two ROS nodes:

- **Global Frontier Detector** — finds frontier points in the global occupancy grid.
- **Local Frontier Detector** — finds frontier points in each robot's local occupancy grid (one per robot).

<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/exploration_and_obstacle_avoidance/rrt_exploration.gif" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    RRT exploration simulation.
</div>

The algorithm runs until the loop-closure condition in the global map is satisfied — assuming the environment forms a closed loop, it stops once no open frontiers remain, indicating that all traversable parts of the terrain are mapped. More details about this package are on the [Wiki](http://wiki.ros.org/rrt_exploration).

## Dynamic Obstacle Avoidance

Ground robots are commonly used in warehouses and factories where the environment is never static. We therefore created a system that can dynamically change the global costmap whenever the environment changes, using an **object-detection and map-update** pipeline.

### 3D Object Detection

We use 3D object detection instead of standard 2D detection because accurately updating the costmap requires the object's position *and* an estimate of its real-world dimensions — a 2D bounding box can't provide this, but a 3D bounding box in the camera frame can. We use MediaPipe's [Objectron](https://google.github.io/mediapipe/solutions/objectron.html) module, which detects objects like chairs, shoes, mugs, and cameras.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/exploration_and_obstacle_avoidance/objectron.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    3D object-detection samples using Objectron.
</div>

After obtaining the nine box points in the camera frame, we transform them into the real world using the [Look-At transformation](https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/lookat-function). Since a single camera can only map a point to a 3D line in the real world, we compute multiple such lines using multiple cameras and use gradient-descent optimization to recover the actual coordinates of each point — from which we compute the object's center and dimensions.

### Map Update

For map updates, we added a new layer to the global costmap as a plugin. The plugin receives data from Objectron and updates the cost at the object's new location as well as its previous location.

<div class="row">
    <div class="col-sm">
        <iframe width="100%" height="300" src="https://www.youtube.com/embed/QN1Fg9xuopc" title="Dynamic map update" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="col-sm">
        <iframe width="100%" height="300" src="https://www.youtube.com/embed/PSlzpGhmcgs" title="Navigation test with map updates" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>
