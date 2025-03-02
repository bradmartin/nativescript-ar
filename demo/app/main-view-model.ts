import { AR, ARLoadedEventData, ARMaterial, ARNodeInteraction, ARPlaneDetectedEventData, ARPlaneTappedEventData, ARSceneTappedEventData, ARTrackingFaceEventData, ARTrackingImageDetectedEventData, ARVideoNode } from "nativescript-ar";

import { Observable, Page, isIOS, Image, Color } from "@nativescript/core";

declare const NSBundle: any;

export class HelloWorldModel extends Observable {
  public message: string;
  public ar: AR;
  public screenshot: Image;
  public page: Page;

  // All these are valid plane materials:
  // public planeMaterial = "Assets.scnassets/Materials/tron/tron-diffuse.png";
  // public planeMaterial = new Color("red");
  public planeMaterial = <ARMaterial>{
    diffuse: new Color("white"),
    transparency: 0.25
  };

  constructor() {
    super();

    const supported = AR.isSupported();
    this.message = `AR supported? ${supported}`;

    console.log(`Image tracking supported? ${AR.isImageTrackingSupported()}`);
  }

  public arLoaded(args: ARLoadedEventData): void {
    this.ar = args.object;
    console.log(">> arLoaded, ar: " + this.ar);

    try {
      this.ar.trackImage({
        image: "https://raw.githubusercontent.com/EddyVerbruggen/nativescript-ar/master/demo/app/App_Resources/Android/src/main/assets/tnsgranite-diffuse.png",
        onDetectedImage: (args) => {
          args.imageTrackingActions.addModel({
            // name: isIOS ? "Models.scnassets/Teapot.usdz" : "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
            name: isIOS ? "Models.scnassets/Car.dae" : "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
            position: {
              x: args.position.x,
              y: args.position.y,
              z: args.position.z - 0.1
            },
            scale: 0.1
          });
        }
      });
    } catch (e) {
      console.error(e);
    }


    // add some stuff to the scene
    /*
  setTimeout(() => {
    args.object.addModel({
      name: isIOS ? "Models.scnassets/Campfire/campfire_v2.dae" : "andy.sfb",
      position: {
        x: 0,
        y: 0,
        z: -0.7
      },
      rotation: {
        x: 0,
        y: 25,
        z: 0
      },
      scale: 0.5,
      onTap: node => console.log("model tapped: " + node)
    });
      args.object.addBox({
        position: {
          x: -0.2,
          y: 0,
          z: -1
        },
        dimensions: {
          x: 0.2,
          y: 0.1,
          z: 0.3
        },
        materials: [new Color("green")],
        // materials: [{
        //   diffuse: {
        //     contents: "Assets.scnassets/Materials/tnsgranite/tnsgranite-diffuse.png",
        //     wrapMode: "ClampToBorder"
        //   }
        // }],
        onTap: node => console.log("box tapped: " + node),
        // onLongPress: node => console.log("box longpressed: " + node.id),
        draggingEnabled: true,
        rotatingEnabled: true
        // onPan: node => console.log("box panned: " + node.id),
      }).then(node => console.log("box added: " + node.id));
      args.object.addSphere({
        position: {
          x: 0.4,
          y: 0.1,
          z: -1.5
        },
        radius: 0.75,
        materials: [new Color("green")],
        onTap: node => console.log("sphere tapped: " + node),
        // onLongPress: node => console.log("box longpressed: " + node.id),
        draggingEnabled: true,
        rotatingEnabled: true
        // onPan: node => console.log("box panned: " + node.id),
      }).then(node => console.log("sphere added: " + node.id));
      args.object.addText({
        text: "NativeScript",
        position: {
          x: 2.7,
          y: -0.2,
          z: -4
        },
        scale: 0.1,
        depth: 1,
        materials: [new Color("blue")],
        rotation: {
          x: 5,
          y: 5,
          z: 5
        },
        onTap: node => console.log("text tapped: " + node.id),
        // onPan: node => console.log("text panned: " + node.id),
      }).then(node => console.log("text added: " + node.id));
      args.object.addText({
        text: "is COOL",
        position: {
          x: 2.7,
          y: -1,
          z: -5
        },
        scale: 0.1,
        depth: 1,
        materials: [new Color("blue")],
        rotation: {
          x: 5,
          y: 5,
          z: 5
        },
        onTap: node => console.log("text tapped: " + node.id),
      }).then(node => console.log("text added: " + node.id));
      args.object.addTube({
        position: {
          x: 0.3,
          y: 0.3,
          z: -1.2
        },
        innerRadius: 0.1,
        outerRadius: 0.15,
        height: 0.2,
        materials: [{
          diffuse: {
            contents: "Assets.scnassets/Materials/tnsgranite/tnsgranite-diffuse.png",
            wrapMode: "Repeat" // which is the default
          },
          roughness: "Assets.scnassets/Materials/tnsgranite/tnsgranite-roughness.png",
          transparency: 1 // solid (which is the default)
        }],
        rotation: {
          x: 20,
          y: 0,
          z: 0
        },
        onTap: node => console.log("tube tapped: " + node.id),
      }).then(node => console.log("tube added: " + node.id));
    }, 1000);
      */
  }

  public trackingFaceDetected(args: ARTrackingFaceEventData): void {
    if (args.properties) {
      // console.log(JSON.stringify(args.properties));
    }

    if (args.faceTrackingActions) {

      let textModel;

      setTimeout(() => {
        args.faceTrackingActions.addText({
          text: "Ray-Ban model S",
          depth: 0.3,
          materials: [new Color("red")],
          scale: {
            x: 0.002,
            y: 0.002,
            z: 0.002
          },
          position: {
            x: -0.1, // a bit to the left
            y: 0.15, // and a bit up
            z: 0
          },
        }).then(result => textModel = result);
      }, 500);

      args.faceTrackingActions.addModel({
        name: "Models.scnassets/glasses-vv-1.dae",
        position: {
          x: 0.001,
          y: 0.01,
          z: 0
        },
        scale: {
          x: 1.03,
          y: 1.03,
          z: 1.03
        },
        onTap: (interaction: ARNodeInteraction) => {
          // let's remove the current glasses, and replace it by a different model
          interaction.node.remove();

          args.faceTrackingActions.addModel({
            name: "Models.scnassets/Glasses9.dae",
            position: {
              x: 0,
              y: 0, // a little lower
              z: 0.04 // a little closer to the camera
            },
            scale: {
              x: 0.17,
              y: 0.17,
              z: 0.17
            },
            onTap: (interaction: ARNodeInteraction) => {
              interaction.node.remove();
              textModel.remove();
            }
          });

          // textModel.remove();
          args.faceTrackingActions.addText({
            text: "Ray-Ban Opaque",
            materials: [new Color("orange")],
            depth: 1,
            scale: {
              x: 0.002,
              y: 0.002,
              z: 0.002
            },
            position: {
              x: -0.1, // a bit to the left
              y: 0.15, // and a bit up
              z: 0
            },
          }).then(result => textModel = result);
        }
      });
    }
  }

  public trackingImageDetected(args: ARTrackingImageDetectedEventData): void {
    console.log("Tracked image detected (name).. " + args.imageName);

    if (args.imageName === "nativescripting") {
      // note that you really want to use locally stored videos, like so:
      if (isIOS) {
        const videoUrl = NSBundle.mainBundle.URLForResourceWithExtensionSubdirectory("celebration", "mp4", "art.scnassets");
        if (!videoUrl) {
          console.log("Could not find video file");
          return;
        }

        args.imageTrackingActions.playVideo("http://techslides.com/demos/samples/sample.mov", true);

        // stop looping the video after 5 seconds
        setTimeout(() => args.imageTrackingActions.stopVideoLoop(), 5000);
      }

    } else if (args.imageName === "ship") {
      console.log("Adding model");
      args.imageTrackingActions.addModel({
        name: "art.scnassets/ship.scn",
        childNodeName: "shipMesh",
        position: {
          x: 0,
          y: 0,
          z: 0.03
        },
        onTap: (interaction: ARNodeInteraction) => {
          // let's move the plane out of the image a bit
          interaction.node.moveBy({
            x: 0,
            y: 0,
            z: 0.01
          });
        },
        onLongPress: (interaction: ARNodeInteraction) => {
          // let's move the plane into the image a bit
          interaction.node.moveBy({
            x: 0,
            y: 0,
            z: -0.01
          });
        }
      });

    } else if (args.imageName === "nativescript nl" || args.imageName === "nativescripting alt" || args.imageName === "hertogjan" || args.imageName === "latrappe") {
      console.log("Adding box");
      args.imageTrackingActions.addBox({
        position: {
          x: args.position.x,
          y: args.position.y,
          z: args.position.z + 0.8
        },
        dimensions: 1.6,
        chamferRadius: 0.1,
        materials: [{
          diffuse: {
            contents: "Assets.scnassets/Materials/tnsgranite/tnsgranite-diffuse.png",
            wrapMode: "ClampToBorder"
          }
        }],
        onTap: (interaction: ARNodeInteraction) => {
          console.log("box tapped: " + interaction.node.id + " at " + interaction.touchPosition);
          // let's rotate the box 5 degrees clockwise
          interaction.node.rotateBy({
            x: 0,
            y: 0,
            z: -5
          });
        },
        onLongPress: (interaction: ARNodeInteraction) => {
          console.log("box longpressed: " + interaction.node.id + " at " + interaction.touchPosition);
          // let's rotate the box 5 degrees counter clockwise
          interaction.node.rotateBy({
            x: 0,
            y: 0,
            z: 5
          });
        }
      }).then(node => console.log("box added to image, id: " + node.id));
    }
  }

  public switchTapped(): void {
    console.log("Switch tapped");
  }

  public planeDetected(args: ARPlaneDetectedEventData): void {
    console.log("Plane detected (id): " + args.plane.id);
  }

  public planeTapped(args: ARPlaneTappedEventData): void {
    console.log("Plane tapped @ x coordinate: " + args.position.x);

    this.ar.addVideo({
      position: {
        x: args.position.x,
        y: args.position.y + 1,
        z: args.position.z
      },
      // you can use either a local or remote video, but beware: sometimes sample-videos.com is down or your device has slow Internet
      video: isIOS ? "art.scnassets/celebration.mp4" : "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4",
      onTap: (interaction: ARNodeInteraction) => {
        const node = <ARVideoNode>interaction.node;
        if (node.isPlaying()) {
          node.pause();
        } else {
          node.play();
        }
      }
    }).catch(console.error);

    this.ar.addImage({
      position: {
        x: args.position.x,
        y: args.position.y + 0.5,
        z: args.position.z
      },
      image: "https://d2odgkulk9w7if.cloudfront.net/images/default-source/logos/ns-logo-shadowed-min.png"
    }).catch(console.error);

    args.object.addModel({
      name: isIOS ? "Models.scnassets/Car.dae" : "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
      position: {
        x: args.position.x + 0.2,
        y: args.position.y + 0.5,
        z: args.position.z
      },
      rotation: {
        x: 0,
        y: 45,
        z: 0
      },
      scale: 0.1,
      rotatingEnabled: true,
      draggingEnabled: true,
      scalingEnabled: true,
      onTap: (interaction: ARNodeInteraction) => {
        console.log("tapped model id: " + interaction.node.id);
        console.log("tapped model position: " + interaction.node.position);
        console.log("tapped model touchPosition: " + interaction.touchPosition);
        // interaction.node.moveBy({
        //   x: 0.02,
        //   y: 0.02,
        //   z: 0.02
        // });
        interaction.node.rotateBy({
          x: 10,
          y: 10,
          z: 10
        });
        // interaction.node.scaleBy(-0.01);
      },
      onLongPress: (interaction: ARNodeInteraction) => console.log("model longpressed: " + interaction.node.id)
    }).catch(console.error);

    const boxDimensions = 0.09;
    const boxMaterialPrefix = isIOS ? "Assets.scnassets/Materials/tnsgranite/" : "";

    args.object.addSphere({
      position: {
        x: args.position.x,
        y: args.position.y + (boxDimensions / 2), // want to drop the box from a meter high (when mass > 0)? add +1
        z: args.position.z
      },
      // scale: 0.5, // this messes up positioning
      // dimensions: boxDimensions,
      radius: 0.15,
      rotation: {
        x: 0,
        y: 0,
        z: 0.2
      },
      materials: [{
        diffuse: {
          contents: boxMaterialPrefix + "tnsgranite-diffuse.png",
          wrapMode: "ClampToBorder"
        }
      }],
      // mass: 0.3,
      onTap: (interaction: ARNodeInteraction) => {
        // let's rotate the box 5 degrees to the right
        interaction.node.rotateBy({
          x: 0,
          y: 3,
          z: 0
        });
      },
      onLongPress: model => {
        console.log(">> long press");
        // model.remove()
      }
    }).then(arNode => {
      console.log("Box successfully added");
      if (arNode.ios) {
        // do something iOS specific here if you like
      }
    });

    const earthMaterialPrefix = isIOS ? "Assets.scnassets/Materials/Earth/" : "";
    args.object.addSphere({
      position: {
        x: args.position.x + 0.3,
        y: args.position.y + 0.5,
        z: args.position.z - 0.5
      },
      // scale: 0.5, // this messes up positioning
      radius: 0.25,
      materials: [{
        diffuse: earthMaterialPrefix + "Earth_Mat_baseColor.png",
        normal: earthMaterialPrefix + "Earth_Mat_normal.png",
        roughness: earthMaterialPrefix + "Earth_Mat_occlusionRoughnessMetallic.png"
      }],
      // mass: 0.3,
      onTap: model => {
        console.log(`Sphere tapped: ${model.node} at ${model.touchPosition}, gonna move it`);
        model.node.moveBy({
          x: 0,
          y: 0.02, // moves the sphere down a little
          z: 0
        });
      },
      onLongPress: model => {
        console.log(">> long pressed sphere");
        // model.remove()
      }
    }).then(earthNode => {
      console.log("Earth successfully added");

      args.object.addSphere({
        position: {x: -.0001, y: 0, z: 0},
        parentNode: earthNode,
        radius: 0.26,
        materials: [{
          diffuse: earthMaterialPrefix + "Earth_Clouds_mat_baseColor.png"
        }]
      }).then(clouds => {
        let fps = 60;
        let degreePerSecond = 3;
        setInterval(() => {
          clouds.rotateBy({x: 0, y: degreePerSecond / fps, z: 0});
        }, 1000 / fps);
      }).catch(console.error);

      this.ar.addUIView({
        position: {x: 0, y: .4, z: 0},
        parentNode: earthNode,
        view: this.page.getViewById("uselessToggleView")
      });

    }).catch(console.error);

    args.object.addTube({
      position: {
        x: args.position.x - 1,
        y: args.position.y + 0.8,
        z: args.position.z + 1
      },
      innerRadius: 0.1,
      outerRadius: 0.2,
      height: 0.5,
      materials: [new Color("orange")],
      // mass: 0.3,
      onTap: model => {
        console.log(`Tube tapped: ${model.node} at ${model.touchPosition}, gonna move it`);
        model.node.moveBy({
          x: 0,
          y: +0.02, // moves the tube up a little
          z: 0
        });
      }
    });
  }

  public sceneTapped(args: ARSceneTappedEventData): void {
    console.log(`Scene tapped @ x / y coordinate: ${args.position.x} / ${args.position.y}`);
  }

  public async grabScreenshot(): Promise<void> {
    if (!this.ar) {
      return;
    }

    this.screenshot.src = await this.ar.grabScreenshot();

    // let's animate the grabbed image on and off screen in an iOS-screenshot style fashion
    this.screenshot.animate({
      opacity: 0.8,
      scale: {
        x: 0.5,
        y: 0.5
      },
      translate: {
        x: -20,
        y: 40
      },
      duration: 500
    });

    setTimeout(() => {
      this.screenshot.animate({
        opacity: 0,
        scale: {
          x: 0.5,
          y: 0.5
        },
        translate: {
          x: -300,
          y: 40
        },
        duration: 500
      });

      setTimeout(() => {
        this.screenshot.animate({
          opacity: 0,
          scale: {
            x: 1,
            y: 1
          },
          translate: {
            x: 0,
            y: 0
          },
          duration: 0
        });
      }, 600);

    }, 2000);
  }

  public recordVideo(): void {
    if (!this.ar) {
      return;
    }

    this.ar.startRecordingVideo()
        .then(() => {
          console.log("Started recording video");

          // stop recording after 2 seconds
          setTimeout(() => {
            this.ar.stopRecordingVideo().then(videoUrl => {
              console.log("Recording result: " + videoUrl);
            });
          }, 2000);
        })
        .catch(err => console.log(err));
  }
}
