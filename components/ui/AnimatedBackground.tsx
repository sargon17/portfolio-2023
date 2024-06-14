"use client";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="main-background">
      <svg
        width="1482"
        height="1022"
        viewBox="0 0 1482 1022"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M303.606 111.531C60.3922 52.3879 -98.5834 58.3242 69.8928 27.7635C238.369 -2.7972 372.644 -148.345 397.345 -1.47803C422.046 145.389 131.963 176.829 524.019 136.815C607.85 128.258 670.947 115.953 719.862 103.431C735.11 93.1329 744.846 91.1199 753.781 94.1163C898.709 51.5676 896.058 16.7971 1009.81 132.198C1164.99 289.618 1277.73 301.491 1111.15 352.059C944.576 402.627 548.72 546.856 902.773 463.089C1256.83 379.322 1216.92 205.851 1419.6 352.059C1622.28 498.266 1957.33 490.351 1526.64 553.452C1095.95 616.552 1385.4 514.756 1038.95 534.104C692.495 553.452 468.282 648.871 454.982 542.678C441.681 436.485 396.712 444.181 603.823 393.173C810.935 342.165 1071.25 404.825 893.273 311.604C715.296 218.383 738.097 200.354 807.135 188.482C876.172 176.609 1059.85 192 893.273 162.099C795.23 144.499 777.273 101.994 753.781 94.1163C743.282 97.1985 732.009 100.321 719.862 103.431C707.087 112.059 690.443 126.502 667.16 148.687C543.02 266.972 690.595 328.973 473.983 256.419C257.37 183.865 -0.4107 160.779 104.729 142.091C188.84 127.141 272.36 115.488 303.606 111.531Z"
          animate={{
            d: "M11.7493 73.5046C405.749 100.005 310.249 -127.495 478.749 107.505C484.799 115.942 490.568 124.395 496.075 132.84C668.471 23.6462 590.826 114.019 576.817 292.336C635.843 439.466 641.501 517.267 757.749 324.005C917.749 58.0049 700.249 39.5046 1006.75 73.5046C1313.25 107.505 1509.25 -142.995 1341.25 196.505C1173.25 536.005 1221.75 710.505 1070.75 444.005C919.749 177.505 1139.25 93.5049 907.249 280.505C675.249 467.505 719.249 856.505 605.249 526.505C575.327 439.887 571.515 359.815 576.817 292.336C557.518 244.231 532.514 188.716 496.075 132.84C485.162 139.752 473.246 147.465 460.249 156.005C164.249 350.505 91.7493 685.005 100.749 420.505C109.749 156.005 130.249 246.505 49.2493 156.005C-15.5507 83.6049 -2.75067 70.838 11.7493 73.5046Z",
          }}
          transition={{
            duration: Math.random() * 5 + 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M750.522 -278.879C685.921 -41.2168 765.153 -191.588 845.36 -59.9213C866.134 -69.4508 898.605 -67.4304 862.289 16.887C816.893 122.284 918.474 0.896346 1237.8 26.1204C1557.13 51.3445 1280.76 121.31 1124.61 254.395C968.456 387.48 1039.75 354.943 958.008 666.169C876.265 977.395 725.416 487.149 653.582 409.711C581.748 332.272 626.592 486.608 587.023 739.476C547.454 992.344 779.082 975.524 598.033 1273.01C416.983 1570.49 384.325 1274.32 506.147 1108.36C627.97 942.393 494.182 973.482 391.133 761.174C288.084 548.867 293.415 766.369 116.174 1015.67C-61.0663 1264.98 3.21192 931.752 59.9646 498.853C116.717 65.9534 208.538 307.911 369.666 537.177C530.794 766.443 567.251 711.057 577.634 509.676C588.017 308.295 529.394 376.99 918.718 209.255C1308.04 41.52 888.131 88.4669 790.099 110.494C692.067 132.521 738.829 36.2966 720.602 -105.443C702.375 -247.183 683.579 -162.995 564.452 27.6419C445.324 218.279 495.501 60.2701 377.052 -137.245C258.603 -334.76 433.163 -188.322 584.407 -166.57C735.651 -144.819 666.263 -258.058 703.237 -497.551C740.211 -737.045 611.509 -479.635 466.884 -379.093C322.259 -278.551 380.708 -420.381 477.638 -596.026C574.568 -771.672 494.422 -785.018 674.342 -852.47C854.261 -919.922 750.233 -810.479 809.671 -610.269C869.109 -410.059 815.123 -516.54 750.522 -278.879Z"
          animate={{
            d: "M11.7493 73.5046C405.749 100.005 310.249 -127.495 478.749 107.505C484.799 115.942 490.568 124.395 496.075 132.84C668.471 23.6462 590.826 114.019 576.817 292.336C635.843 439.466 641.501 517.267 757.749 324.005C917.749 58.0049 700.249 39.5046 1006.75 73.5046C1313.25 107.505 1509.25 -142.995 1341.25 196.505C1173.25 536.005 1221.75 710.505 1070.75 444.005C919.749 177.505 1139.25 93.5049 907.249 280.505C675.249 467.505 719.249 856.505 605.249 526.505C575.327 439.887 571.515 359.815 576.817 292.336C557.518 244.231 532.514 188.716 496.075 132.84C485.162 139.752 473.246 147.465 460.249 156.005C164.249 350.505 91.7493 685.005 100.749 420.505C109.749 156.005 130.249 246.505 49.2493 156.005C-15.5507 83.6049 -2.75067 70.838 11.7493 73.5046Z",
          }}
          transition={{
            duration: Math.random() * 5 + 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}