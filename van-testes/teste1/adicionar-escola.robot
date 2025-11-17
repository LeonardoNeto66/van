*** Settings ***
Library    SeleniumLibrary 
Documentation    Testes automatizados para o cadastro de escolas. 
Test Setup       Abrir navegador para adicionar escola
Test Teardown    Fechar navegador 
Resource    resources.robot 

*** Test Cases ***

CT02: Adicionar nova escola com sucesso
    [Documentation]   
    [Tags]    escolas    cadastro
    
    Acessar página de cadastro de escolas
    
    Preencher dados da escola    ${NOME_ESCOLA}    ${ENDERECO_ESCOLA}
    
    Clicar em adicionar escola
    
   