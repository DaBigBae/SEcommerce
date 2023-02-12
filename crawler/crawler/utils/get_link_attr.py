def get_link_from_file(file):
        link = []
        with open(file, "r") as f:
            try:
                lines = f.readlines()
                for line in lines:
                    if line.rstrip():
                        link.append(line.strip())
            except:
                pass
        return link