---
layout: page
title: Small World IoT Networks
description: Enhancing network performance by introducing the small-world phenomenon using actor-critic reinforcement learning, with ML-based fault-node prediction.
img: assets/img/projects/small_world_networks/btp.png
importance: 1
category: research
related_publications: true
---

This project develops a predictive model for identifying faulty sensor nodes in small-world IoT networks. The approach uses actor-critic reinforcement learning to introduce small-world characteristics into the network, and leverages ML algorithms and network-analysis techniques to detect and predict faulty sensor nodes. We validated the approach on simulated small-world IoT networks and analyzed key network parameters — lifetime, energy consumption, latency, and throughput — obtaining results comparatively better than the existing state of the art. This work was carried out as my bachelor thesis and led to a Best Paper Award at IEEE ANTS 2024 {% cite sharma2024node %}.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/small_world_networks/small_world.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

[**Slides**](https://docs.google.com/presentation/d/1tEmpKW1WuS5YF-kOod68OaBXXA-uT42HTm8UrCv7Xl4/edit?usp=sharing) · [**Report**](https://docs.google.com/document/d/1m-3kWzKlFeyUswC65PTfnNGThCYujZLb9wJ3u7WnKUk/edit?usp=sharing)

## Fault Node Detection

Sensor nodes have low initial energy and tend to fail or die during data routing through a large IoT network. For efficient data transmission with optimal energy consumption and lifetime, we need to predict the nodes likely to fail so we can eliminate them. We prepared our own fault-node dataset on a simulated IoT network by adding noise to network properties, then trained and tested several anomaly/outlier detection algorithms:

1. One-Class SVM
2. Elliptic Envelope
3. Isolation Forest
4. Local Outlier Factor
5. Density-Based Spatial Clustering (DBSCAN)

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/small_world_networks/accuracy_5.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/small_world_networks/f1score_5.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

From these results, **DBSCAN** was the most optimal approach, outperforming other popular methods. We therefore selected DBSCAN for our pipeline and integrated it with data routing, which improved network performance by increasing lifetime and decreasing energy consumption.

## Small World Networks

Small world is a phenomenon first observed in the social connectivity of people. Here we apply it to wireless sensor networks (WSNs): introducing long-range links between nodes decreases the Average Path Length (APL) and Average Clustering Coefficient (ACC), making the network well-connected and able to transmit data efficiently with high lifetime and throughput and low energy consumption and latency. We need an algorithm that can efficiently introduce links so that the network attains the most optimal small-world characteristics.

<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/small_world_networks/apl_acc.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

### Actor-Critic Reinforcement Learning

We use the PPO algorithm to introduce long-range links in the network, defined as follows:

1. **Environment** — the simulated WSN.
2. **State** — the network graph.
3. **Action** — the node IDs that need to be connected.
4. **Reward** — defined in terms of ACC and APL.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/small_world_networks/reward.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

### Results

Results for a 500 m × 500 m network with 400 nodes, for links introduced both with a sink node and within nodes:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/small_world_networks/tosink.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/small_world_networks/sink_network.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    APL–ACC comparison with the small-world transformation, and the resulting network with links to the sink node.
</div>

## Data Routing & Performance

We analyzed and compared the performance of the obtained small-world networks against conventional networks by routing data and studying the effect of fault-node detection, using the following metrics: energy consumption, network lifetime, throughput, and latency.

- **Small-world WSN vs. conventional WSN** — higher lifetime, lower latency, less average energy consumed, higher throughput, fewer hops.
- **Small-world WSN vs. direct transmission** — higher lifetime, less average energy consumed.
- **Effect of fault-node prediction** — higher lifetime, higher throughput.
