def func(n):
    def dfs(pos, steps, visited):
        if pos in visited: return False
        
        visited.add(pos)
        if steps == n: return True
        
        next_pos = (pos + steps) % n
        if dfs(next_pos, steps + 1, visited): return True
        
        return False

    for start in range(n):
        visited = set()
        if dfs(start, 1, visited): return True

    return False

res = func(int(input()))
if res == False: print("NO")
else: print("YES")