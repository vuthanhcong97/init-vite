#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const https = require("https")
const { exec } = require("child_process")
const packageJson = require("../package.json")
exec(`echo "${packageJson.version}"`)

const dependencies = {
	"@reduxjs/toolkit": packageJson.dependencies["@reduxjs/toolkit"],
	"react-redux": packageJson.dependencies["react-redux"],
	"react-router-dom": packageJson.dependencies["react-router-dom"]
}
const listAddDependencies = Object.entries(dependencies)
	.map(([key, value]) => `${key}@${value}`)
	.join(" ")

const devDependencies = {
	"@testing-library/jest-dom": packageJson.devDependencies["@testing-library/jest-dom"],
	"@testing-library/react": packageJson.devDependencies["@testing-library/react"],
	"@testing-library/user-event": packageJson.devDependencies["@testing-library/user-event"],
	"jsdom": packageJson.devDependencies["jsdom"],
	"vitest": packageJson.devDependencies["vitest"],
}

const listAddDevDependencies = Object.entries(devDependencies)
	.map(([key, value]) => `${key}@${value}`)
	.join(" ")

console.log("install project use vite")
exec(
	`npm create vite@latest ${process.argv[2]} -- --template react`,
	(initErr, initStdout, initStderr) => {
		if (initErr) {
			console.error(
				`Everything was fine, then it wasn't:
				${initErr}`
			)
			return
		}

		console.log(initStdout)
		console.log("===============DONE===============")
		console.log(
			`install ${Object.keys(dependencies).join(" ")} and ${Object.keys(
				devDependencies
			).join(" ")}`
		)
		exec(
			`cd ${process.argv[2]} && npm i && npm i ${listAddDependencies} && npm i -D ${listAddDevDependencies}`,
			(initErr, initStdout, initStderr) => {
				if (initErr) {
					console.error(
						`install package failed:
						${initErr}`
					)
					return
				}

				console.log(initStdout)
				console.log("===============DONE===============")

				exec(
					`cd ${process.argv[2]} && rm -r src`,
					(initErr, initStdout, initStderr) => {
						if (initErr) {
							console.error(
								`rm src failed:
								${initErr}`
							)
							return
						}

						console.log(initStdout)

						exec(
							`cd ${process.argv[2]} && rm vite.config.js`,
							(
								initErr,
								initStdout,
								initStderr
							) => {
								if (initErr) {
									console.error(
										`cannot remove vite.config.js:
										${initErr}`
									)
									return
								}

								console.log(initStdout)
								const filesToCopy = [
									"vite.config.js",
									"jsconfig.json"
								]
								for (
									let i = 0;
									i < filesToCopy.length;
									i += 1
								) {
									fs.createReadStream(
										path.join(
											__dirname,
											`../${filesToCopy[i]}`
										)
									).pipe(
										fs.createWriteStream(
											`${process.argv[2]}/${filesToCopy[i]}`
										)
									)
								}
							}
						)

						exec(
							`cd ${process.argv[2]} && rm .gitignore`,
							(
								initErr,
								initStdout,
								initStderr
							) => {
								if (initErr) {
									console.error(
										`cannot remove .gitignore:
										${initErr}`
									)
									return
								}

								console.log(initStdout)
							}
						)

						// npm will remove the .gitignore file when the package is installed, therefore it cannot be copied
						// locally and needs to be downloaded.
						https.get(
							"https://raw.githubusercontent.com/vuthanhcong97/init-vite/main/.gitignore",
							(res) => {
								res.setEncoding("utf8")
								let body = ""
								res.on(
									"data",
									(data) => {
										body += data
									}
								)
								res.on("end", () => {
									fs.writeFile(
										`${process.argv[2]}/.gitignore`,
										body,
										{
											encoding:
												"utf-8",
										},
										(err) => {
											if (err)
												throw err
										}
									)
									fs.cp(
										path.join(
											__dirname,
											"../src"
										),
										`${process.argv[2]}/src`,
										{ recursive: true },
										(err) => {
											if(err) {
												console.error(
													`cannot copy src:
													${initErr}`
												)
												return
											}

											exec(
												`cd ${process.argv[2]} && git add . && git commit -m "initial project"`,
												(
													err,
													stdout,
													stderr
												) => {
													console.log("Done. Now run:")
													console.log(`cd ${process.argv[2]}`)
													console.log("npm i")
													console.log("npm run dev")
													console.log("Happy Coding!")
												}
											)
										}
									)
								})
							}
						)
					}
				)
			}
		)
	}
)
