import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import json from "@rollup/plugin-json";
import pkg from "./package.json";
import scss from 'rollup-plugin-scss'

// TODO [https://stackoverflow.com/questions/48836575/can-i-have-multiple-entry-points-using-rollup-with-gulp]
// 첫번째 답변을 참고하면 
// 이것으로 여러개의 엔트리를 만들 수 있음을 알았다.
// 성능을 위해서 여러가지 엔트리를 가진 컴포넌트를 만들자.
export default {
    input: "src/RC.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: "es",
            exports: "named",
            sourcemap: true,
        }
    ],
    plugins: [
        scss(),
        external(),
        resolve(),
        typescript({
            rollupCommonJSResolveHack: true,
            exclude: ["**/__tests__/**"],
            clean: true
        }),
        json(),
        commonjs({
            include: ["node_modules/**"],
            namedExports: {
                "node_modules/react/react.js": [
                    "Children",
                    "Component",
                    "PropTypes",
                    "createElement"
                ],
                "node_modules/react-dom/index.js": ["render"]
            }
        })
    ]
};
