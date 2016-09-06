#aimlessness assassin baby beekeeper belladonna cannonball crybaby denver embraceable facetious flashbulb gaslight hobgoblin iconoclas tissue kebab kilo laundered mattress millennia natural obsessive paranoia queen rabble reabsorb sacrilegious schoolroom tabby tabloid unbearable union videotape
import re

def get_matching_words(regex):
    words = ["aimlessness", "assassin", "baby", "beekeeper", "belladonna", "cannonball", "crybaby", "denver", "embraceable", "facetious", "flashbulb", "gaslight", "hobgoblin", "iconoclast", "issue", "kebab", "kilo", "laundered", "mattress", "millennia", "natural", "obsessive", "paranoia", "queen", "rabble", "reabsorb", "sacrilegious", "schoolroom", "tabby", "tabloid", "unbearable", "union", "videotape"]

    return [word for word in words if re.search(regex, word)]


# 1)
print 1, get_matching_words(r'v')

# 2)
print 2, get_matching_words(r's{2}')

# 3)
print 3, get_matching_words(r'e$')

# 4)
print 4, get_matching_words(r'b.b')

# 5)
print 5, get_matching_words(r'b[\w]+b')

# 6)
print 6, get_matching_words(r'b[\w]*b')

# 7)
print 7, get_matching_words(r'a[a-z^[iou]]*e[a-z^[ou]]*i[a-z^u]*o[a-z]*u')

# 8)
print 8, get_matching_words(r'^[aegilnoprsux]+$')

# 9)
print 9, get_matching_words(r'(.)\1')
