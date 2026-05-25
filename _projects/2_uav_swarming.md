---
layout: page
title: UAV Control and Swarming
description: Cascaded PID-based control and swarm motion of drones — our solution to the Drona Aviation Pluto Swarm Challenge at Inter IIT Tech Meet 11.0.
img: assets/img/projects/uav_swarming/drona.png
importance: 2
category: competitions
---

This is our solution for the Drona Aviation Pluto Swarm Challenge at Inter IIT Tech Meet 11.0. It comprises the following three tasks:

- **Task 1** — Create a Python wrapper for the drone that enables users to control it without using the mobile application.
- **Task 2** — Use ArUco markers and an overhead camera to localize the drone. Implement a PID controller to hover it at a constant position and move it in a rectangular path.
- **Task 3** — Create a swarm of two drones where one drone follows the other autonomously in a 1×2 m rectangular trajectory.

<div class="row justify-content-sm-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/uav_swarming/overview.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

[**Code**](https://github.com/phoenixrider12/Drona_Aviation_Pluto_Swarm_Challenge) · [**Slides**](https://www.canva.com/design/DAFaFTY0xgs/tUFYxl4E0rU_p3ImxOLw6w/edit) · [**Report**](https://docs.google.com/document/d/1C3aBHsVej1FMQTWQ28ycVaX1jU1rXKR4bD5fFLXH45g/edit?usp=sharing)

## Task 1 — Python Wrapper

The Python wrapper is built upon the Pluto ROS package provided as a reference. It begins an instant connection with the drone by initiating a class that relies on multithreading and TCP communication to maintain continuous communication with the drone. Transmission occurs using the MultiWii Serial Protocol (MSP), encoded and decoded in the reader and writer files.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_swarming/task_1_1.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_swarming/task_1_2.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Task 2 — Localization and Control

The drone hovers at a position and moves in a 1×2 m rectangle while maintaining a certain height. The requirements are:

- **Localization**: pose estimation of an ArUco marker
- **Controls**: PID for position and height control
- **Trajectory**: defines the path for the drone

We used a Logitech BRIO 4K camera (1080p, 60 fps) and a 45×45 mm, 4×4-bit ArUco marker (ID 0).

### Localization

The pose-estimation process is as follows:

1. Calibrate the camera to compute its intrinsic matrix and distortion coefficients.
2. Detect the markers using OpenCV's ArUco library.
3. Transform the point to the camera's coordinate frame by computing the extrinsic matrix via `solvePnP()`.
4. Correct the noisy height estimate using machine learning to make readings accurate enough for optimal height control.

<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_swarming/lookat.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Look-At transformation from the 2D image plane to the 3D real world.
</div>

The classical method gave accurate x and y positions, but height estimates were only satisfactory near the center of the camera's FOV and quite erroneous near the boundaries. To improve accuracy, we brought machine learning into the picture.

#### Pose Correction using Machine Learning

For height correction, we prepared our **own dataset** using a Time-of-Flight (ToF) sensor and applied linear regression on the transformed pose to predict the drone's height precisely. For better tolerance against noise and fluctuation, we introduced a **Kalman Filter** that fuses the current IMU acceleration with the regression-based pose estimate to provide the final pose to the controller. Other than smoothing data, it also guards against failure cases such as the camera failing to localize the drone.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_swarming/pose_estimation.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Pose-estimation pipeline.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_swarming/data.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_swarming/filter.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Ground-truth, ArUco-estimated, and ML-estimated height values, and the filtered height estimate.
</div>

### Control

PID controls movement in the x, y, and z directions, estimating roll, pitch, and thrust to achieve the desired coordinates. Any change in the pitch and roll changes the direction of the thrust force, causing erroneous movement; to counter this, the component of thrust along the z-direction is taken, and the drone's coordinate system is transformed into the camera's frame using yaw values. We used trackbars to dynamically tune PID values and `matplotlib` to continuously visualize the system's state and target.

<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_swarming/pid_algo.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    PID control equations.
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm-8">
        <iframe width="100%" height="360" src="https://www.youtube.com/embed/ZkdNJh-Itqo" title="Hovering with PID control" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>

### Trajectory

To move the drone in a 1×2 m rectangle, we wrote a function that returns a list of waypoints, with all movement controlled by PID. The path is broken into chunks; a function continuously checks whether the next checkpoint has been reached by comparing it with the drone's current coordinates, then updates the step and next coordinate until the final destination is reached.

<div class="row justify-content-sm-center">
    <div class="col-sm-8">
        <iframe width="100%" height="360" src="https://www.youtube.com/embed/0F8SiWoXGAI" title="Rectangular trajectory" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>

## Task 3 — Swarming

Task 3 asked us to control a follower drone that traces a similar path to the primary drone from Task 2. Our solution was to use **multi-UAV flocking algorithms** to achieve accurate following. The three simple rules, in the context of our task, are:

1. **Alignment** — the follower attempts to move in the average velocity direction of the primary drone.
2. **Cohesion** — the follower attempts to move toward the average position of the primary drone.
3. **Separation** — the follower attempts to move away if it gets too close to the primary drone.

#### Alignment

<div class="row justify-content-sm-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_swarming/alignment.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

```python
align(self, target):
    desiredVelocity = target.Velocity()
    steerForce = Vector.sub(desiredVelocity, currentVelocity)
    steerForce.limit(maxforce)
    self.applyForce(steerForce)
```

#### Cohesion

<div class="row justify-content-sm-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_swarming/cohesion.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

```python
cohesion(self, target):
    relPosition = target.Position() - self.Position()
    steerForce = Vector.sub(relPosition, target.Velocity())
    steerForce.limit(maxforce)
    self.applyForce(steerForce)
```

#### Separation

<div class="row justify-content-sm-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/uav_swarming/separation.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

```python
separation(self, target):
    relPosition = target.Position() - self.Position()
    distance = relPosition.Magnitude()
    if distance < threshold:
        steerForce = -1 * relPosition
        steerForce.limit(maxforce)
        self.applyForce(steerForce)
```

### Implementation

The entire algorithm was compiled into a simulation using PyBullet and a Gym environment. Due to time and hardware constraints, we could not transform the simulation into a hardware implementation; however, we achieved a highly accurate path-following algorithm that precisely guides the follower drone along the correct trajectory.

<div class="row justify-content-sm-center">
    <div class="col-sm-8">
        <iframe width="100%" height="360" src="https://www.youtube.com/embed/tpI8suAL9DM" title="Two-drone swarm" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>
