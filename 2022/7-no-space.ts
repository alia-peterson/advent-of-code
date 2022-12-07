const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

import { commands } from "./data/7-no-space";

type TFolders = { [key: string]: number };

type TDirectory = { output: TFolders; path: string };

const handleCdCommand = (command: string, acc: TDirectory) => {
  const [, dir] = command.split("cd ");
  if (dir === "..") {
    const updated = acc.path.split("/");
    acc.path = updated.slice(0, updated.length - 1).join("/");
  } else if (dir === "/") {
    // do nothing
  } else {
    if (!acc.path) {
      acc.path = dir;
    } else {
      acc.path += `/${dir}`;
    }
  }
};

const handleDirCommand = (command: string, acc: TDirectory) => {
  const [, directory] = command.split("dir ");
  // add directory to output object { a: 0 }
  if (!acc.path) {
    acc.output[directory] = 0;
  } else {
    acc.output[`${acc.path}/${directory}`] = 0;
  }
};

const handleFileCommand = (command: string, acc: TDirectory) => {
  const [size, _] = command.split(" ");

  if (!acc.output[acc.path]) {
    acc.output[acc.path] = 0;
  }
  acc.output[acc.path] += parseInt(size);
};

const generateDirectory = (commands: string[]) => {
  return commands.reduce(
    (acc: TDirectory, command) => {
      if (command.includes("$ cd")) {
        handleCdCommand(command, acc);
      } else if (command.includes("dir")) {
        handleDirCommand(command, acc);
      } else if (command.match(/([\d])/)) {
        handleFileCommand(command, acc);
      }
      return acc;
    },
    { output: {}, path: "" }
  );
};

const calculateCombinedFiles = (directory: TFolders) => {
  return Object.keys(directory).reduce(
    (acc: { [key: string]: number }, name) => {
      acc[name] = 0;

      Object.entries(directory).forEach(([folder, size]) => {
        if (folder.includes(name)) {
          acc[name] += size;
        }
      });

      return acc;
    },
    {}
  );
};

const calculateFoldersUnderSize = (
  combinedSizes: TFolders,
  maxSize: number
) => {
  return Object.values(combinedSizes).reduce((acc, size) => {
    if (size <= maxSize) {
      acc += size;
    }
    return acc;
  }, 0);
};

const findDirectorySizes = (input: string) => {
  const commands = input.split("\n");

  const directory = generateDirectory(commands);
  const combinedFiles = calculateCombinedFiles(directory.output);
  const total = calculateFoldersUnderSize(combinedFiles, 100000);

  console.log(total);
};

findDirectorySizes(commands);
