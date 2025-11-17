*** Settings ***
Documentation    
Library    SeleniumLibrary

*** Variables ***
${URL}                    http://localhost:4200/
${TEXTO_PAG_INICIAL}      //h1[@class='title'][contains(.,'Bem-vindo')]
${EMPRESAS}               //a[@class='btn btn-cta'][contains(.,'Empresas')]
${TEXTO_PAG_EMPRESAS}     //h1[contains(.,'Cadastrar Empresas')]
${BTN_DETALHES}           //button[@type='button'][contains(.,'Ver detalhes')]
${BTN_EDITAR_DADOS}       //button[@type='button'][contains(.,'Editar dados')]
${EDITAR_NOME}            //input[@name='editNome']
${EDITAR_NOME_FANTASIA}   //input[contains(@name,'editNomeFantasia')]
${BTN_SALVAR}             //button[@type='submit'][contains(.,'Salvar alterações')]

*** Keywords ***
Abrir navegador para editar empresa
    Open Browser    ${URL}    browser=firefox
    Maximize Browser Window

Fechar navegador
    Capture Page Screenshot    
    Close Browser

Acessar página de empresas
    [Documentation]    
    Go To    ${URL}
    Wait Until Page Contains Element    ${TEXTO_PAG_INICIAL}    timeout=10s
    Click Element    ${EMPRESAS}
    Wait Until Page Contains Element    ${TEXTO_PAG_EMPRESAS}    timeout=10s

Editar dados da empresa
    [Documentation]
    Scroll Element Into View    ${BTN_DETALHES}
    Click Button    ${BTN_DETALHES}
    Wait Until Page Contains Element    ${BTN_EDITAR_DADOS}    timeout=10s
    Click Button    ${BTN_EDITAR_DADOS}
    Wait Until Page Contains Element    ${EDITAR_NOME}    timeout=10s
    Input Text    ${EDITAR_NOME}    Tio GuiGui
    Input Text    ${EDITAR_NOME_FANTASIA}    Tio GuiGui Ltda


Clicar em salvar alterações
    [Documentation]   
    Click Button    ${BTN_SALVAR}


 

