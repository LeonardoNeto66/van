*** Settings ***
Documentation    
Library    SeleniumLibrary

*** Variables ***
${URL}                    http://localhost:4200/
${TEXTO_PAG_INICIAL}      //h1[@class='title'][contains(.,'Bem-vindo')]
${ESCOLAS}                //a[@class='btn btn-cta'][contains(.,'Escolas')]
${TEXTO_PAG_ESCOLAS}      //h1[contains(.,'Gerenciar Escolas')]
${INPUT_NOME_ESCOLA}      //input[contains(@name,'nome')]
${INPUT_ENDERECO_ESCOLA}  //input[contains(@name,'endereco')]
${NOME_ESCOLA}            Leonardo da Vinci
${ENDERECO_ESCOLA}        Rua das Flores, 123
${BUTTON_SALVAR}          //button[@type='submit'][contains(.,'Adicionar escola')]

*** Keywords ***
Abrir navegador para adicionar escola
    Open Browser    ${URL}    browser=firefox
    Maximize Browser Window

Fechar navegador
    Capture Page Screenshot    
    Close Browser

Acessar página de cadastro de escolas
    [Documentation]    
    Go To    ${URL}
    Wait Until Page Contains Element    ${TEXTO_PAG_INICIAL}    timeout=10s
    Click Element    ${ESCOLAS}
    Wait Until Page Contains Element    ${TEXTO_PAG_ESCOLAS}    timeout=10s

Preencher dados da escola
    [Arguments]    ${nome}    ${endereco}
    [Documentation]  
    Input Text    ${INPUT_NOME_ESCOLA}       ${nome}
    Input Text    ${INPUT_ENDERECO_ESCOLA}   ${endereco}

Clicar em adicionar escola
    [Documentation]   
    Click Button    ${BUTTON_SALVAR}
    Wait Until Page Contains Element    ${TEXTO_PAG_ESCOLAS}    timeout=10s

