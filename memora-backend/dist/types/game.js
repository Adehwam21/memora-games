"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameInitialConfig = exports.GameTypeEnum = void 0;
const stroopUtils_1 = require("../utils/stroopUtils");
var GameTypeEnum;
(function (GameTypeEnum) {
    GameTypeEnum["GuessWhat"] = "guess-what";
    GameTypeEnum["Stroop"] = "stroop";
})(GameTypeEnum || (exports.GameTypeEnum = GameTypeEnum = {}));
exports.GameInitialConfig = {
    guessWhat: {
        title: "guess-what",
        type: "Memory",
        maxLevels: 10,
        defaultMemorizationTime: 20000,
        memorizationTimeReductionPerLevel: 1000,
        minMemorizationTime: 10000,
        maxAttempts: 3,
        basePairs: 2,
        imageSet: [
            "https://cdn.pixabay.com/photo/2012/04/15/20/53/cherries-35288_960_720.png",
            "https://cdn.pixabay.com/photo/2014/12/21/23/39/bananas-575773_960_720.png",
            "https://cdn.pixabay.com/photo/2012/05/03/23/13/cat-46676_1280.png",
            "https://cdn.pixabay.com/photo/2018/07/16/15/31/dog-3542195_960_720.png",
            "https://cdn.pixabay.com/photo/2016/04/08/15/42/elephant-1316325_1280.png",
            "https://cdn.pixabay.com/photo/2014/03/24/13/49/trout-294469_1280.png",
            "https://cdn.pixabay.com/photo/2024/04/07/03/14/strawberry-8680487_960_720.png",
            "https://cdn.pixabay.com/photo/2021/06/15/22/07/watermelon-6339725_960_720.png",
            // "https://cdn.pixabay.com/photo/2017/01/23/16/35/house-2003068_960_720.png",
            "https://cdn.pixabay.com/photo/2020/05/22/12/39/cone-ice-cream-5205265_1280.png",
            // "https://cdn.pixabay.com/photo/2013/07/12/14/54/slime-148995_1280.png"
        ]
    },
    // Add different intial configuration for other game types here
    stroop: {
        title: "stroop",
        type: "Executive Function",
        duration: 90000,
        questions: (0, stroopUtils_1.generateStroopQuestions)(150),
    }
};
//# sourceMappingURL=game.js.map