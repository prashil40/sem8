def get_letter_client_id(mappings, letter_id):
  for mapping in mappings:
    if letter_id in mapping:
      return mapping[letter_id]
  
  raise KeyError('No match found for this letter_id')