"use client";
import React, { useState } from "react";
import {
  Download,
  User,
  Clock,
  Zap,
  Activity,
  Play,
  ExternalLink,
  Info,
  Image,
  Settings,
  FileText,
  Users,
  Award,
  Video,
  Gauge,
  Cpu,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BookOpen,
  List,
  Target,
} from "lucide-react";

const MapArtCleanerPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("info");

  const images = [
    "https://cdn.discordapp.com/attachments/1391310387525455915/1391310635161227346/image.png",
    // Add more images as needed
  ];

  const data = {
    title: "36 Color Mapart Clearer",
    version: "v3.0",
    author: "TechMC",
    description:
      "An intermediate mapart recycler that can clear and recycle maps consisting of up to 36 colors.",
    efficiency: "1200",
    difficulty: "Hard",
    downloads: [
      { name: "litematica_file.litematic", type: "schematic", icon: FileText },
      { name: "world_download.wrl", type: "world", icon: Download },
    ],
    designers: ["<@143918724745920512>", "<@210165632807862272>"],
    credits: [
      {
        user: "<@723445440632061964>",
        contribution: "Early concept assistance",
      },
      {
        user: "<@213396692924497921>",
        contribution: "Idea and original flying machine for snow fill",
      },
      {
        user: "<@335426949885329411>",
        contribution: "Reliable item collection troughs",
      },
      { user: "<@320526362219905038>", contribution: "Dolphin assistance" },
      { user: "<@698509405334798357>", contribution: "Bug fixes" },
    ],
    versions: ["1.15+"],
    rates: {
      snowFill: "3.54km²/h (128m²/130s)",
      mapClearing: "6.23km²/h (128m²/74s)",
    },
    lagInfo: {
      testEnvironment: "CPU M4 with Lithium in 1.21.4",
      idle: "0.41mspt",
      active: {
        mapClearing: "8.91mspt",
        snowFill: "0.89mspt",
      },
    },
    positives: [
      "Flying machines can clear in both directions, allowing for a faster clear",
      "Snow fill saves lots of labor in placing white carpets",
      "Supports transparent maps if built over void",
    ],
    negatives: ["Storage only has 1x hopper speed sorting"],
    videoLink: "https://www.youtube.com/watch?v=MVhEjSjanYU",
    videos: [
      { name: "showcase_demo.mp4", type: "showcase" },
      { name: "build_tutorial.mp4", type: "tutorial" },
    ],
  };

  const tabs = [
    { id: "info", label: "Info", icon: Info },
    { id: "gallery", label: "Gallery", icon: Image },
    { id: "specs", label: "Design Specs", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start gap-8">
            {/* Thumbnail */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-muted rounded-lg overflow-hidden border border-border">
                <img
                  src={images[selectedImage]}
                  alt={data.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Title and Basic Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-primary">
                  {data.title}
                </h1>
              </div>
              <p className="text-xl text-muted-foreground mb-3">
                {data.description}
              </p>

              {/* Version Compatibility */}
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Compatible with:{" "}
                </span>
                <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                  {data.versions.join(", ")}
                </span>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">{data.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">{data.efficiency} iron/hour</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-muted-foreground" />
                  <div className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                    {data.difficulty}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex border-b border-border mb-6">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            {activeTab === "info" && (
              <div className="space-y-8">
                {/* Performance Rates */}
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-primary" />
                    Rates
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <Clock className="w-8 h-8 text-blue-500" />
                      <div>
                        <div className="font-semibold">Snow Fill Mode</div>
                        <div className="font-mono text-sm text-muted-foreground">
                          {data.rates.snowFill}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <Zap className="w-8 h-8 text-green-500" />
                      <div>
                        <div className="font-semibold">Map Clearing Mode</div>
                        <div className="font-mono text-sm text-muted-foreground">
                          {data.rates.mapClearing}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-lg border border-border p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      Positives
                    </h3>
                    <ul className="space-y-3">
                      {data.positives.map((positive, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{positive}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-red-600 dark:text-red-400">
                      <XCircle className="w-5 h-5" />
                      Negatives
                    </h3>
                    <ul className="space-y-3">
                      {data.negatives.map((negative, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{negative}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                    Instructions
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        Important Notes
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                        <li>
                          • Snow fill can be run after carpets and pressure
                          plates, but must be run before any pots, candles, or
                          dripstone are placed
                        </li>
                        <li>
                          • All 36 colors are only available in certain versions
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-blue-500" />
                        Build Instructions
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                        <li>
                          • The podzol/coarse dirt/grass block floor is purely
                          decorational, and can be replaced with all dirt
                        </li>
                        <li>
                          • Mapart clearers are directional and locational. Open
                          a map to figure out which 8x8 chunk area the build
                          aligns with
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <List className="w-5 h-5 text-green-500" />
                        How to Use
                      </h3>
                      <ol className="space-y-2 text-sm text-muted-foreground ml-7">
                        <li>1. Remember to lock your map before clearing</li>
                        <li>
                          2. Hit the note block labeled &quot;Map&quor clear to
                          launch the map clearer
                        </li>
                        <li>
                          3. Hit the note block labeled &quot;Snow fill&quot; to
                          launch the snow filler
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="space-y-8">
                {/* Images */}
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Image className="w-6 h-6 text-primary" />
                    Images
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-video bg-muted rounded-lg overflow-hidden border border-border"
                      >
                        <img
                          src={image}
                          alt={`${data.title} screenshot ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Videos */}
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Video className="w-6 h-6 text-primary" />
                    Videos
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.videos.map((video, index) => (
                      <div
                        key={index}
                        className="aspect-video bg-muted rounded-lg border border-border flex items-center justify-center"
                      >
                        <div className="text-center">
                          <Play className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm font-medium">{video.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {video.type}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Schematic Viewer */}
                {/* <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Eye className="w-6 h-6 text-primary" />
                    Schematic Viewer
                  </h2>
                  <div className="aspect-video bg-muted rounded-lg border border-border flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium">
                        3D Schematic Preview
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Interactive schematic viewer would be loaded here
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            )}

            {activeTab === "specs" && (
              <div className="space-y-8">
                {/* Lag Performance */}
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-primary" />
                    Lag Performance
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <Clock className="w-8 h-8 text-green-500" />
                      <div>
                        <div className="font-semibold">Idle</div>
                        <div className="font-mono text-sm text-muted-foreground">
                          {data.lagInfo.idle}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <Activity className="w-8 h-8 text-orange-500" />
                      <div>
                        <div className="font-semibold">Map Clearing</div>
                        <div className="font-mono text-sm text-muted-foreground">
                          {data.lagInfo.active.mapClearing}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <Clock className="w-8 h-8 text-blue-500" />
                      <div>
                        <div className="font-semibold">Snow Fill</div>
                        <div className="font-mono text-sm text-muted-foreground">
                          {data.lagInfo.active.snowFill}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      <strong className="text-sm">Test Environment:</strong>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {data.lagInfo.testEnvironment}
                    </p>
                  </div>
                </div>

                {/* Design Specifications */}
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Settings className="w-6 h-6 text-primary" />
                    Design Specifications
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Version Support:
                          </span>
                          <div className="font-mono text-sm">
                            {data.versions.join(", ")}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Efficiency:
                          </span>
                          <div className="font-mono text-sm">
                            {data.efficiency} items/hour
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Gauge className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Difficulty:
                          </span>
                          <div className="text-sm">{data.difficulty}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Designers */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Designers
              </h3>
              <div className="space-y-2">
                {data.designers.map((designer, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{designer}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Credits */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Credits
              </h3>
              <div className="space-y-3">
                {data.credits.map((credit, index) => (
                  <div
                    key={index}
                    className="text-sm border-l-2 border-muted pl-3"
                  >
                    <div className="font-medium flex items-center gap-2">
                      <User className="w-3 h-3 text-muted-foreground" />
                      {credit.user}
                    </div>
                    <div className="text-muted-foreground text-xs mt-1">
                      {credit.contribution}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Downloads */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                Downloads
              </h3>
              <div className="space-y-3">
                {data.downloads.map((download, index) => {
                  const IconComponent = download.icon;
                  return (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-accent transition-colors text-left"
                    >
                      <IconComponent className="w-4 h-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          {download.name}
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {download.type}
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Videos */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" />
                Videos
              </h3>
              <div className="space-y-3">
                <a
                  href={data.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-accent transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">Showcase Video</div>
                    <div className="text-xs text-muted-foreground">YouTube</div>
                  </div>
                </a>
                {data.videos.map((video, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-accent transition-colors text-left text-sm"
                  >
                    <Play className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="font-medium">{video.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {video.type}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapArtCleanerPage;
