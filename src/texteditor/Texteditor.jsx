import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Texteditor({ descricao, setDescricao }) {

  return (
    <div style={{ marginTop: 16 }}>
      <label><strong>Descrição:</strong></label>
      <CKEditor
        editor={ClassicEditor}
        data={descricao}
        onChange={(event, editor) => {
          const data = editor.getData();
          setDescricao(data);
        }}
      />
    </div>
  );
}

export default Texteditor;
