package main 

import(
	"fmt"
	"embed"
	"flag"
	"log"
	"strings"
	"os"
	"os/exec"
	"path/filepath"
)
//go:embed templates/*
var template embed.FS
func main(){
	var project_name string
	flag.StringVar(&project_name, "name", "project", "name-your-project")
	flag.Parse()
	var projectDir string
	projectDir = project_name

	var file_paths []string 
	file_paths = filesInFolder("templates")
	fmt.Println((file_paths))
  fmt.Println()
	for _, fileName := range file_paths{
		
		content, err := template.ReadFile(fileName)
		if(err != nil){
			log.Fatal(err)
		}

		newFileName := strings.TrimPrefix(fileName, "templates/")
		
		dir := filepath.Dir(projectDir + "/" + newFileName)

		err = os.MkdirAll(dir, 0755)

		if err != nil{
			log.Fatal(err)
		}

		err = os.WriteFile(projectDir + "/" + newFileName, content, 0644)
		if err != nil{
			log.Fatal(err)
			fmt.Println("Could not create file = ", newFileName)
		} else {
			fmt.Println("File created = ", newFileName)
		}
	}
	fmt.Println("Initializing Project ....")

	err := runCommand(projectDir, "npm", "init", "-y")

	if err != nil{
		log.Fatal(err)
	}

	err = runCommand(projectDir, "npm", "install", "express", "mongoose", "jsonwebtoken", "dotenv", "bcrypt")
	if err != nil{
		log.Fatal(err)
	}
	fmt.Println("Starting Your Server")
	err = runCommand(projectDir, "node", "index.js")
	if err != nil{
		log.Fatal(err)
	}
}
func filesInFolder(folder string) []string{
	var files []string
	return collectFiles(folder, files)
}
func collectFiles(folder string, files []string) [] string{
	folder = strings.TrimSuffix(folder, "/")
	
	filesList, err := template.ReadDir(folder) // reads the contents of a directory represented by f, -1 means all entries, returned files is []os.FileInfo 
	if err != nil{
		log.Fatal(err) 
	}
	var path string
	for _, file := range filesList{
		if file.IsDir(){
			path = folder + "/" + file.Name()
			files = collectFiles(path, files)
		}else{
			files = append(files, folder + "/" + file.Name())
		}
	}
	return files
}

func runCommand(dir string, name string, args ...string) error{
	
	cmd := exec.Command(name, args...)
	cmd.Dir = dir
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	return cmd.Run()
}