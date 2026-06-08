import subprocess

commit = input("Enter commit message: ")

commands = [
    ["git", "add", "."],
    ["git", "commit", "-m", commit],
    ["git", "push"]
]

for cmd in commands:
    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        print("Error:")
        print(result.stderr)
        break

    print(result.stdout)