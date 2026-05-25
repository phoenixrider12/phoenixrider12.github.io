// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "My publications in reverse chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A collection of robotics projects from my undergrad at IIT (BHU) Varanasi — competitions and research.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "My background, education, and research experience. Download the PDF version using the button above.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "news-started-my-b-tech-in-electronics-engineering-at-the-indian-institute-of-technology-iit-bhu",
          title: 'Started my B.Tech. in Electronics Engineering at the Indian Institute of Technology (IIT...',
          description: "",
          section: "News",},{id: "news-started-a-research-internship-at-vail-changwon-national-university",
          title: 'Started a research internship at VAIL, Changwon National University.',
          description: "",
          section: "News",},{id: "news-started-a-research-internship-at-rbbcps-indian-institute-of-science-iisc",
          title: 'Started a research internship at RBBCPS, Indian Institute of Science (IISc).',
          description: "",
          section: "News",},{id: "news-appointed-as-tech-lead-of-roboreg-robotics-research-group-of-iit-bhu",
          title: 'Appointed as Tech Lead of RoboReG (Robotics Research Group) of IIT BHU.',
          description: "",
          section: "News",},{id: "news-started-a-research-internship-at-rncsl-carleton-university",
          title: 'Started a research internship at RNCSL, Carleton University.',
          description: "",
          section: "News",},{id: "news-started-a-research-internship-at-the-sia-lab-university-of-southern-california",
          title: 'Started a research internship at the SIA Lab, University of Southern California.',
          description: "",
          section: "News",},{id: "news-attended-research-week-with-google-2024-at-google-research-india-bengaluru",
          title: 'Attended Research Week with Google 2024 at Google Research India, Bengaluru.',
          description: "",
          section: "News",},{id: "news-my-paper-on-mitigating-system-level-failures-in-visual-controllers-got-accepted-into-icra-2024",
          title: 'My paper on mitigating system-level failures in visual controllers got accepted into ICRA...',
          description: "",
          section: "News",},{id: "news-graduated-from-the-indian-institute-of-technology-iit-bhu-with-a-major-in-electronics-engineering",
          title: 'Graduated from the Indian Institute of Technology (IIT BHU) with a major in...',
          description: "",
          section: "News",},{id: "news-presented-my-paper-on-mitigating-system-level-failures-in-visual-controllers-at-icra-2024-in-yokohama-japan",
          title: 'Presented my paper on mitigating system-level failures in visual controllers at ICRA 2024...',
          description: "",
          section: "News",},{id: "news-my-paper-on-drone-docking-on-offshore-platforms-using-deep-rl-got-accepted-to-the-applied-soft-computing-journal",
          title: 'My paper on drone docking on offshore platforms using deep-RL got accepted to...',
          description: "",
          section: "News",},{id: "news-new-paper-on-enhancing-the-safety-and-robustness-of-vision-based-controllers-via-reachability-analysis-submitted-to-ieee-t-ro",
          title: 'New paper on enhancing the safety and robustness of vision-based controllers via reachability...',
          description: "",
          section: "News",},{id: "news-my-paper-on-efficient-data-routing-in-small-world-iot-networks-got-accepted-into-ieee-ants-2024-and-won-the-best-paper-award",
          title: 'My paper on efficient data routing in small-world IoT networks got accepted into...',
          description: "",
          section: "News",},{id: "news-started-my-ph-d-in-aeronautics-and-astronautics-at-stanford-university",
          title: 'Started my Ph.D. in Aeronautics and Astronautics at Stanford University.',
          description: "",
          section: "News",},{id: "news-new-paper-on-mllm-based-semantic-interpretation-of-robotic-failure-data-is-out-on-arxiv",
          title: 'New paper on MLLM-based semantic interpretation of robotic failure data is out on...',
          description: "",
          section: "News",},{id: "news-presented-my-paper-on-mllm-based-failure-interpretability-at-the-ood-generalization-and-robot-evaluation-workshops-at-rss-2025",
          title: 'Presented my paper on MLLM-based failure interpretability at the OOD Generalization and Robot...',
          description: "",
          section: "News",},{id: "projects-multi-agent-warehouse-coverage-amp-cleaning",
          title: 'Multi-Agent Warehouse Coverage &amp;amp; Cleaning',
          description: "Efficient coverage and cleaning of unknown terrains using multiple ground robots — 2nd place at the AIITRA Robotics Challenge 2021.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_multi_agent_coverage/";
            },},{id: "projects-uav-control-and-swarming",
          title: 'UAV Control and Swarming',
          description: "Cascaded PID-based control and swarm motion of drones — our solution to the Drona Aviation Pluto Swarm Challenge at Inter IIT Tech Meet 11.0.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_uav_swarming/";
            },},{id: "projects-uav-guided-ugv-navigation",
          title: 'UAV-Guided UGV Navigation',
          description: "UAV-aided mapping and localization enabling a UGV to autonomously traverse mountainous terrain — our solution to the DRDO Challenge at Inter IIT Tech Meet 10.0.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_uav_ugv_navigation/";
            },},{id: "projects-multi-agent-exploration-amp-dynamic-obstacle-avoidance",
          title: 'Multi-Agent Exploration &amp;amp; Dynamic Obstacle Avoidance',
          description: "An RRT-exploration and visual obstacle-detection pipeline for multi-robot mapping with dynamic map updates.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_exploration_and_obstacle_avoidance/";
            },},{id: "projects-multi-purpose-household-robot",
          title: 'Multi-Purpose Household Robot',
          description: "A fully ROS-integrated mobile robot for everyday household tasks — autonomous navigation, vacuum cleaning, and deep-learning abilities like human following and threat detection.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_household_bot/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%61%72%79%61%6D%61%6E%6E@%73%74%61%6E%66%6F%72%64.%65%64%75", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=AWhTyqwAAAAJ", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/phoenixrider12", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/aryaman1210", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/Aryaman1020", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
