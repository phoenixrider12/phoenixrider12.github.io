---
layout: page
title: UAV-Guided UGV Navigation
description: UAV-aided mapping and localization enabling a UGV to autonomously traverse mountainous terrain — our solution to the DRDO Challenge at Inter IIT Tech Meet 10.0.
img: assets/img/projects/uav_ugv_navigation/uav_ugv.gif
importance: 3
category: competitions
---

This is our solution to the DRDO Navigation Challenge at Inter IIT Tech Meet 10.0. In the problem statement, we were asked to use a UAV to explore and map a mountainous terrain during summer. After mapping, the UAV must guide a UGV to traverse the terrain during winter, when the roads are covered with snow.

Key points from the problem statement:

- The UAV has an IMU, a GPS, and an RGB-D camera as sensors.
- The UGV has no sensors.
- The mapping must be completed in the textured world, while the UGV navigates in the untextured world.

<div class="row justify-content-sm-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/uav_ugv_navigation/overview.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

[**Code**](https://github.com/phoenixrider12/DRDO-UAV-Guided-UGV-Navigation/tree/master) · [**Slides**](https://docs.google.com/presentation/d/1wgCw-pj4WYZ1QgIoMBwp1pqgJasY5RpXskZN9Sr_edU/edit?usp=sharing) · [**Report**](https://github.com/phoenixrider12/DRDO-UAV-Guided-UGV-Navigation/blob/master/MP_DR_T14_Mid.pdf)

## Approach

The project is divided into three parts:

- **Mapping** — we segmented roads from the UAV camera feed using U-Net and used frontier exploration to map the entire terrain.
- **UAV localization and control** — we used ArduPilot coupled with our own control and planning algorithms; localization fused GPS and IMU data.
- **UGV localization and control** — we used YOLOv5 on the UAV camera feed to localize the UGV relative to the UAV, and the `se2_navigation` and `navfn` ROS packages for path planning and control.

## UAV Localization

We fused the incoming GPS and IMU data using an **Extended Kalman Filter** to produce odometry. The `ekf_localization` node in the [robot_localization](https://wiki.ros.org/robot_localization) package provided 15-DoF odometry. The maximum observed error after multiple goal points was ±0.5 m in all three axes.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_ugv_navigation/uav_loc.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_ugv_navigation/uav_loc.gif" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Terrain Mapping

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_ugv_navigation/mapping_flow.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

### Road Segmentation

We prepared a dataset of simulated environment images, manually annotated them using [CVAT](https://www.cvat.ai/), and trained a **U-Net** to segment roads. With standard augmentation, we obtained ~96% accuracy on test data.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_ugv_navigation/unet_results.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_ugv_navigation/mapping_block.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    U-Net segmentation results (left) and the exploration pipeline (right).
</div>

Mapping was implemented using the [RTAB-Map](http://wiki.ros.org/rtabmap_ros) package, which uses an RGB-D SLAM approach to create a 2D occupancy grid from the 3D point cloud captured by the RGB-D camera atop the drone. We then implemented frontier exploration using the [frontier_exploration](http://wiki.ros.org/explore_lite) package to explore the terrain — moving to new frontiers (boundaries between open and unexplored space) until none remain.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_ugv_navigation/rtabmap.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_ugv_navigation/frontier.gif" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## UGV Navigation

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_ugv_navigation/nav_flow.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

### Detection and Tracking

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_ugv_navigation/ugv_detect_flow.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Detection and tracking pipeline.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_ugv_navigation/ugv_detect.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_ugv_navigation/ugv_track.gif" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

### Controls

For UGV control we used a Pure Pursuit controller — a path-tracking algorithm that computes the angular velocity command to move the robot from its current position toward a look-ahead point in front of it.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_ugv_navigation/ugv_control_block.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_ugv_navigation/ugv_control.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

### Planning

- **Local planner — OMPL** (Open Motion Planning Library), a collection of state-of-the-art sampling-based motion-planning algorithms.
- **Global planner — TEB** (Timed Elastic Band), which locally optimizes the robot's trajectory with respect to execution time, separation from obstacles, and compliance with kinodynamic constraints at runtime.

We used the [se2_navigation](https://github.com/leggedrobotics/se2_navigation) package, which subscribes to the car's odometry (w.r.t. the drone's initial pose). When a goal point is published in the same odom frame, the SE(2) OMPL planner plans a trajectory — a sequential array of poses — for the car to follow.

<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_ugv_navigation/ugv_planning.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
